from __future__ import absolute_import, division, print_function, unicode_literals

import hashlib

import pickledb

db = pickledb.load('cache.db', False)
enabled = True


def get_artist(artist_id):
    """
    Get artist record from cache.

    :param artist_id: artist ID.
    :return: artist record.
    """
    if enabled:
        return db.get('artist:{}'.format(artist_id))


def put_artist(artist):
    """
    Cache artist record.

    :param artist: artist record.
    """
    if enabled:
        db.set('artist:{}'.format(artist['id']), artist)
        db.dump()


def get_similar(genres):
    """
    Get similar artists by genre from cache.

    :param genres: genre name list.
    :return: similar artist IDs.
    """
    if enabled:
        return db.get('artist:similar:{}'.format(_make_genre_key(genres)))


def put_similar(genres, artist_ids):
    """
    Cache similar artists by genre.

    :param genres: genre name list.
    :param artist_ids: similar artist IDs.
    """
    if enabled:
        db.set('artist:similar:{}'.format(_make_genre_key(genres)), artist_ids)
        db.dump()


def get_artist_search(term):
    """
    Get search results from cache.

    :param term: search term.
    :return: artist record list.
    """
    if enabled:
        return db.get('artist:search:{}'.format(term))


def put_artist_search(term, artist_ids):
    """
    Cache search results.

    :param term: search term.
    :param artist_ids: artist ID list.
    """
    if enabled:
        db.set('artist:search:{}'.format(term), artist_ids)
        db.dump()


def _make_genre_key(genres):
    """
    Create consistent hash key for a list of genre names.

    :param genres: genre name list.
    :return: genre key string.
    """
    return hashlib.md5('|'.join(sorted(set(genres)))).hexdigest()
