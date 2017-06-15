from __future__ import absolute_import, division, print_function, unicode_literals

import spotipy
import spotipy.util

spotify_token = None


def authenticate_spotify(username, scopes=None):
    global spotify_token

    if scopes is None:
        scopes = ['user-library-read']

    spotify_token = spotipy.util.prompt_for_user_token(username, ' '.join(scopes))
    return spotify_token


def get_spotify_client():
    return spotipy.Spotify(spotify_token)
