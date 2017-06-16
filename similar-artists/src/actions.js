import 'isomorphic-fetch';

export const SEARCH_ARTIST = 'SEARCH_ARTIST';
export const SEARCH_ARTIST_COMPLETE = 'SEARCH_ARTIST_COMPLETE';
export const SELECT_ARTIST = 'SELECT_ARTIST';
export const SELECT_ARTIST_COMPLETE = 'SELECT_ARTIST_COMPLETE';

const apiRoot = 'http://localhost:3010';


/**
 * Search for artists by term.
 *
 * @param {string} term artist search term.
 * @returns {function} thunk.
 */
export function searchArtist(term) {
    return dispatch => {
        dispatch({
            type: SEARCH_ARTIST,
            term
        });

        fetch(apiRoot + '/artists/?term=' + encodeURIComponent(term))
            .then(response => {
                if (!isResponseOK(response)) {
                    response.text()
                        .then(result => {
                            dispatch({
                                type: SEARCH_ARTIST_COMPLETE,
                                term,
                                error: {
                                    code: response.status,
                                    message: result
                                }
                            });
                        });
                } else {
                    response.json()
                        .then(result => {
                            dispatch({
                                type: SEARCH_ARTIST_COMPLETE,
                                term,
                                artists: result.artists
                            });
                        });
                }
            });
    };
}


/**
 * Select artist by ID.
 *
 * @param {string} artistId artist ID to select.
 * @returns {function} thunk.
 */
export function selectArtist(artistId) {
    return dispatch => {
        dispatch({
            type: SELECT_ARTIST,
            artistId
        });

        fetch(apiRoot + '/artists/' + encodeURIComponent(artistId) + '/similar/')
            .then(response => {
                if (!isResponseOK(response)) {
                    response.text()
                        .then(result => {
                            dispatch({
                                type: SELECT_ARTIST_COMPLETE,
                                artistId,
                                error: {
                                    code: response.status,
                                    message: result
                                }
                            });
                        });
                } else {
                    response.json()
                        .then(result => {
                            dispatch({
                                type: SELECT_ARTIST_COMPLETE,
                                artistId,
                                artist: result.artist,
                                similar: result.similar
                            })
                        });
                }
            })
    };
}


function isResponseOK(response) {
    return response.status > 199 && response.status < 300;
}
