from __future__ import absolute_import, division, print_function, unicode_literals

import spotipy
import spotipy.util

spotify_token = None


def authenticate_spotify(username, scopes=None):
    """
    Authenticate Spotify session.

    :param username: Spotify username.
    :param scopes: list of auth scopes required (defaults to 'user-library-read').
    :return: Spotify OAuth token.
    """
    global spotify_token

    if scopes is None:
        scopes = ['user-library-read']

    spotify_token = spotipy.util.prompt_for_user_token(username, ' '.join(scopes))
    return spotify_token


def get_spotify_client():
    """
    Get authenticated Spotify client.
    Requires calling authenticate_spotify() first.

    :return: Spotify client.
    """
    return spotipy.Spotify(spotify_token)
