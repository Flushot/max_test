import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchInput from './searchInput';
import SearchResults from './searchResults';
import ArtistDetails from './artistDetails';
import * as Actions from '../actions';
import logo from '../logo.png';
import './app.css';


class App extends Component {
    render() {
        const { selection, search } = this.props.state;

        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo"/>
                    <h2>Artist Search</h2>
                    <SearchInput term={search.term}
                                 isBusy={search.busy}
                                 error={search.error}
                                 onSearch={this.onSearch.bind(this)}/>
                </div>

                <div className="container">
                    <div className="search-panel">
                        {search.term ? (
                            <SearchResults results={search.results}
                                           isBusy={search.busy}
                                           selectedArtistId={selection.artistId}
                                           onArtistClick={this.onArtistClick.bind(this)}/>
                        ) : ''}
                    </div>

                    {selection.artist || selection.busy ? (
                        <div className="selection-panel">
                            {selection.busy && !selection.artist ? (
                                <span>Loading artist profile...</span>
                            ) : (
                                <ArtistDetails artist={selection.artist}
                                               similar={selection.similar}
                                               isBusy={selection.busy}
                                               onSimilarArtistClick={this.onArtistClick.bind(this)}/>
                            )}
                        </div>
                    ) : ''}
                </div>
            </div>
        );
    }

    /**
     * Search button clicked.
     *
     * @param {string} term search term.
     */
    onSearch(term) {
        this.props.dispatch(Actions.searchArtist(term));
    }

    /**
     * Artist tile clicked.
     *
     * @param {string} artistId
     */
    onArtistClick(artistId) {
        this.props.dispatch(Actions.selectArtist(artistId));
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default connect(mapStateToProps)(App);
