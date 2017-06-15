from __future__ import absolute_import, division, print_function, unicode_literals

import logging
import sys

import argparse
import gevent.monkey
gevent.monkey.patch_socket()
from gevent.pywsgi import WSGIServer

from max_api.server import app, config


log = logging.getLogger(__name__)

default_host = '127.0.0.1'
default_port = 3010

argp = argparse.ArgumentParser(description='Dev server')
argp.add_argument('spotify_username')
argp.add_argument('--port', '-p', type=int,
                  default=default_port,
                  help='Listen port (default: {})'.format(default_port))
argp.add_argument('--interface', '-i',
                  default=default_host,
                  help='Listen interface (default: {})'.format(default_host))
args = argp.parse_args()

logging.basicConfig(level=logging.DEBUG)

listen_addr = args.interface
listen_port = args.port
app.debug = True

log.info('Authenticating Spotify user: {}'.format(args.spotify_username))
token = config.authenticate_spotify(args.spotify_username)
if not token:
    log.error('Unable to authenticate with Spotify')
    sys.exit(1)

log.info('Starting server on http://{}:{}'.format(listen_addr, listen_port))
http_server = WSGIServer((listen_addr, listen_port), app)

try:
    http_server.serve_forever()
except KeyboardInterrupt:
    print('Thanks for playing')
