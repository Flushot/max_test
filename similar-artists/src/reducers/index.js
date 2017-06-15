import * as Actions from '../actions';

const initialState = {
    search: {
        busy: false,
        term: null,
        results: []
    },
    selection: {
        artist: null,
        busy: false,
        similar: []
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SEARCH_ARTIST:
            return Object.assign({}, state, {
                search: {
                    busy: true,
                    term: action.term,
                    results: []
                }
            });

        case Actions.SEARCH_ARTIST_COMPLETE:
            return Object.assign({}, state, {
                search: Object.assign({}, state.search, {
                    busy: false,
                    results: action.artists
                })
            });

        case Actions.SELECT_ARTIST:
            return Object.assign({}, state, {
                selection: {
                    artistId: action.artistId,
                    busy: true,
                    similar: []
                }
            });

        case Actions.SELECT_ARTIST_COMPLETE:
            return Object.assign({}, state, {
                search: Object.assign({}, state.search, {
                    term: action.artist.name
                }),
                selection: {
                    artistId: action.artist.id,
                    artist: action.artist,
                    busy: false,
                    similar: action.similar
                }
            });

        default:
            return state;
    }
}