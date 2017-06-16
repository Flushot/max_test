from __future__ import absolute_import, division, print_function, unicode_literals

import logging
from functools import partial

from flask import Flask, request, url_for, redirect, abort, jsonify
import flask_cors

from max_api import config, cache, utils


# Init Flask
application = app = Flask(__name__)
flask_cors.CORS(app)  # Allow cross-origin requests on all routes

log = logging.getLogger(app.logger_name)
#cache.enabled = False


@app.route('/artists/', methods=['GET'])
def find_artists():
    """
    Find artists by name.

    :return: search results.
    """
    term = request.args.get('term')
    if not term:
        return 'Search term required', 400, {'Content-Type': 'text/plain'}

    spotify = config.get_spotify_client()

    artist_ids = cache.get_artist_search(term)
    if artist_ids:
        # Cache hit
        artists = map(partial(utils.get_artist, spotify), artist_ids)
    else:
        # Cache miss
        results = spotify.search(q='artist:"{}"'.format(term), type='artist')
        artists = map(utils.transform_artist, results['artists']['items'])

        cache.put_artist_search(term, map(lambda artist: artist['id'], artists))
        for artist in artists:
            cache.put_artist(artist)

    log.debug('Found {} artists matching "{}"'.format(len(artists), term))

    return jsonify(artists=artists)


@app.route('/artists/<artist_id>/similar/', methods=['GET'])
def find_similar_artists(artist_id):
    """
    Find similar artists (by shared genres).

    :param artist_id: artist ID to find other similar artists for.
    :return: similar artists.
    """
    spotify = config.get_spotify_client()

    artist = utils.get_artist(spotify, artist_id)
    genres = artist['genres']

    if len(genres) == 0:
        artists = []
    else:
        artist_ids = cache.get_similar(genres)
        if artist_ids and len(artist_ids) > 0:
            # Cache hit
            artists = map(partial(utils.get_artist, spotify), artist_ids)
        else:
            # Cache miss
            genre_expr = ' '.join(['genre:"{}"'.format(genre) for genre in genres])
            results = spotify.search(q=genre_expr, type='artist')
            artists = filter(lambda artist: artist['id'] != artist_id,
                             map(utils.transform_artist, results['artists']['items']))
            cache.put_similar(genres, map(lambda artist: artist['id'], artists))
            for similar_artist in artists:
                cache.put_artist(similar_artist)

    log.debug('Found {} artists similar to {} (id: {})'.format(len(artists), artist['name'], artist_id))

    return jsonify(artist=utils.transform_artist(artist),
                   similar=artists)


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
