from __future__ import absolute_import, division, print_function, unicode_literals

import json
import logging
from pprint import pprint
from functools import partial

from flask import Flask, request, url_for, redirect, abort, jsonify
import flask_cors
import spotipy

from max_api import config, cache


# Init Flask
application = app = Flask(__name__)
flask_cors.CORS(app)  # Allow cross-origin requests on all routes

log = logging.getLogger(app.logger_name)


def transform_artist(artist):
    record = {k: artist.get(k) for k in ('name', 'id', 'uri', 'genres', 'popularity', 'images')}

    if 'images' in artist and len(artist['images']) > 0:
        record['image'] = artist['images'][0]['url']  # Simplification: Just use first image

    return record


def get_artist(spotify, artist_id):
    artist = cache.get_artist(artist_id)
    if not artist:
        artist = spotify.artist(artist_id)
        cache.put_artist(artist)

    return artist


@app.route('/artists/', methods=['GET'])
def find_artists():
    term = request.args.get('term')
    if not term:
        return 'Search term required', 400, {'Content-Type': 'text/plain'}

    spotify = config.get_spotify_client()

    artist_ids = cache.get_artist_search(term)
    if artist_ids:
        # Cache hit
        artists = map(partial(get_artist, spotify), artist_ids)
    else:
        # Cache miss
        results = spotify.search(q='artist:{}'.format(term), type='artist')
        artists = map(transform_artist, results['artists']['items'])

        cache.put_artist_search(term, artists)
        for artist in artists:
            cache.put_artist(artist)

    return jsonify(artists=artists)


@app.route('/artists/<artist_id>/similar/', methods=['GET'])
def find_similar_artists(artist_id):
    spotify = config.get_spotify_client()

    artist = get_artist(spotify, artist_id)
    genres = artist['genres']

    if len(genres) == 0:
        similar = []
    else:
        similar = cache.get_similar(genres)
        if not similar:
            # HACK: I'm not familiar with how to Spotify's API by genre,
            # so this seemed to be a good alt solution (for the sake of limited time)
            try:
                recommends = spotify.recommendations(seed_genres=genres, limit=20)
                artist_ids = set(map(lambda artist: artist['id'],
                                     map(lambda track: track['artists'][0],  # Results contain an array of single element arrays
                                         recommends['tracks'])))
                similar = map(transform_artist, map(partial(get_artist, spotify), artist_ids))  # TODO: Parallelize across threads
                cache.put_similar(genres, similar)
            except spotipy.SpotifyException as ex:
                # HACK: Workaround for issue with malformed requests if there's too many genres
                log.exception(ex)
                similar = []

    return jsonify(artist=transform_artist(artist),
                   similar=similar)


@app.errorhandler(Exception)
def error_catchall(error):
    import traceback

    log.exception(error.message)
    return (
        jsonify({
            'error': 'Server error',
            'message': error.message,
            'traceback': traceback.format_exc().splitlines(),
            'exception': error.__class__.__name__
        }),
        500,
        {'Content-Type:': 'application/json'}
    )
