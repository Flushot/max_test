# MAX Coding Test

## Getting Started

### Prerequesites

* node 6+
* npm
* python 2.6+

### Backend (max_api)

1. Set up an app on Spotify and obtain credentials at https://developer.spotify.com/my-applications
(you can set the redirect URI to anything)
2. Export these environment variables:
    * SPOTIPY_CLIENT_ID
    * SPOTIPY_CLIENT_SECRET
    * SPOTIPY_REDIRECT_URI
3. `cd max_api`
4. Symlink the Python module with `python setup.py develop`
5. Run the server with `python -m max_api <your_spotify_username>`

This should start a REST endpoint at http://localhost:3010

### Frontend (similar-artists)

1. `cd similar-artists`
2. `npm start`

This should start the web app at http://localhost:3000
