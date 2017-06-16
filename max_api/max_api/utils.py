from __future__ import absolute_import, division, print_function, unicode_literals

from max_api import cache, config


def transform_artist(artist):
    """
    Transform Spotify artist record into MAX artist record.

    :param artist: artist record to transform.
    :return: transformed artist record (dict).
    """
    record = {k: artist.get(k) for k in ('name', 'id', 'uri', 'genres', 'popularity', 'images')}

    if 'images' in artist and len(artist['images']) > 0:
        record['image'] = artist['images'][0]['url']  # Simplification: Just use first image

    return record


def get_artist(spotify, artist_id):
    """
    Get an artist record from cache.
    On cache miss, will fetch and cache record from Spotify API.

    :param spotify: Spotify client.
    :param artist_id: artist ID to get.
    :return: artist record.
    """
    artist = cache.get_artist(artist_id)
    if not artist:
        # Cache miss
        artist = spotify.artist(artist_id)
        cache.put_artist(artist)

    return artist
