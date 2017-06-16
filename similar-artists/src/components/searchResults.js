import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ArtistTile from './artistTile';
import './searchResults.css';


export default class SearchResults extends Component {
    render() {
        const { results, selectedArtistId } = this.props;

        return (
            <div className={classNames('search-results', { busy: this.props.isBusy })}>
                {results.length > 0 ? (
                    <div>
                        <div className="search-result-count">Showing {results.length} results</div>
                        <div className="artist-tile-grid">
                            {results.map(artist => <ArtistTile key={artist.id}
                                                               artist={artist}
                                                               isSelected={artist.id === selectedArtistId}
                                                               onClick={this.props.onArtistClick.bind(this, artist.id)}/>)}
                        </div>
                    </div>
                ) : (
                    !this.props.isBusy ? (
                        <div>No results found</div>
                    ) : ''
                )}
            </div>
        );
    }
}


SearchResults.propTypes = {
    results: PropTypes.array.isRequired,
    isBusy: PropTypes.bool,
    selectedArtistId: PropTypes.string,
    onArtistClick: PropTypes.func.isRequired
};

SearchResults.defaultProps = {
    isBusy: false,
    selectedArtistId: null
};
