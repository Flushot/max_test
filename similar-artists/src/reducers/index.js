import * as Actions from '../actions';

const initialState = {
    search: {
        busy: false,
        error: null,
        term: null,
        results: []
    },
    selection: {
        artist: null,
        busy: false,
        error: null,
        similar: []
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SEARCH_ARTIST:
            return Object.assign({}, state, {
                search: Object.assign({}, state.search, {
                    busy: true,
                    term: action.term,
                    error: null
                })
            });

        case Actions.SEARCH_ARTIST_COMPLETE:
            return Object.assign({}, state, {
                search: Object.assign({}, state.search, {
                    busy: false,
                    error: action.error,
                    results: (action.error ? [] : action.artists)
                })
            });

        case Actions.SELECT_ARTIST:
            return Object.assign({}, state, {
                selection: Object.assign({}, state.selection, {
                    artistId: action.artistId,
                    busy: true,
                    error: null
                })
            });

        case Actions.SELECT_ARTIST_COMPLETE:
            return Object.assign({}, state, {
                search: Object.assign({}, state.search, {
                    term: action.artist.name
                }),
                selection: {
                    artistId: action.artistId,
                    busy: false,
                    error: action.error,
                    artist: (action.error ? null : action.artist),
                    similar: (action.error ? [] : action.similar)
                }
            });

        default:
            return state;
    }
}