import 'isomorphic-fetch';
import _ from 'lodash';

export const SEARCH_ARTIST = 'SEARCH_ARTIST';
export const SEARCH_ARTIST_COMPLETE = 'SEARCH_ARTIST_COMPLETE';
export const SELECT_ARTIST = 'SELECT_ARTIST';
export const SELECT_ARTIST_COMPLETE = 'SELECT_ARTIST_COMPLETE';

const apiRoot = 'http://localhost:3010';


export function searchArtist(term) {
    return dispatch => {
        dispatch({
            type: SEARCH_ARTIST,
            term
        });

        fetch(apiRoot + '/artists/?term=' + encodeURIComponent(term))
            .then(response => {
                response.json()
                    .then(result => {
                        dispatch({
                            type: SEARCH_ARTIST_COMPLETE,
                            term,
                            artists: result.artists
                        });
                    })
            });
    };
}


export function selectArtist(artistId) {
    return dispatch => {
        dispatch({
            type: SELECT_ARTIST,
            artistId
        });

        fetch(apiRoot + '/artists/' + encodeURIComponent(artistId) + '/similar/')
            .then(response => {
                response.json()
                    .then(result => {
                        dispatch({
                            type: SELECT_ARTIST_COMPLETE,
                            artistId,
                            artist: result.artist,
                            similar: result.similar
                        })
                    })
            })
    };
}
