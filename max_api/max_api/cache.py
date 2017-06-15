from __future__ import absolute_import, division, print_function, unicode_literals

import hashlib

import pickledb

db = pickledb.load('cache.db', False)


def get_artist(artist_id):
    return db.get('artist:{}'.format(artist_id))


def put_artist(artist):
    db.set('artist:{}'.format(artist['id']), artist)


def _make_genre_key(genres):
    return hashlib.md5('|'.join(sorted(set(genres))))


def get_similar(genres):
    return db.get('artist:similar:{}'.format(_make_genre_key(genres)))


def put_similar(genres, artists):
    db.set('artist:similar:{}'.format(_make_genre_key(genres)), artists)


def get_artist_search(term):
    return db.get('artist:search:{}'.format(term))


def put_artist_search(term, artists):
    db.set('artist:search:{}'.format(term), map(lambda artist: artist['id'], artists))

