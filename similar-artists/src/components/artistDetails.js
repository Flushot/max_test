import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ArtistTile from './artistTile';
import anonymous from '../anonymous.png';


export default class ArtistDetails extends Component {
    render() {
        const { artist, similar } = this.props;

        return (
            <div className={classNames('artist-details', { busy: this.props.isBusy })}>
                <h1>{artist.name}</h1>

                <img src={artist.image || anonymous}
                     alt={artist.name}
                     title={artist.name}
                     className="artist-image"/>

                <table className="details-table">
                    <tbody>
                        <tr>
                            <th>Popularity:</th>
                            <td>{artist.popularity}</td>
                        </tr>
                        {artist.genres.length > 0 ? (
                            <tr>
                                <th>Genres:</th>
                                <td>
                                    <ul>
                                        {artist.genres.map(genre => <li key={genre}>{genre}</li>)}
                                    </ul>
                                </td>
                            </tr>
                        ) : ''}
                    </tbody>
                </table>

                {similar.length > 0 ? (
                    <div>
                        <h2>Similar Artists</h2>
                        <div className="artist-tile-grid">
                            {similar.map(artist => <ArtistTile key={artist.id}
                                                               artist={artist}
                                                               onClick={this.props.onSimilarArtistClick.bind(this, artist.id)}/>)}
                        </div>
                    </div>
                ) : ''}
            </div>
        );
    }
}


ArtistDetails.propTypes = {
    artist: PropTypes.object.isRequired,
    isBusy: PropTypes.bool,
    similar: PropTypes.array,
    onSimilarArtistClick: PropTypes.func.isRequired
};

ArtistDetails.defaultProps = {
    isBusy: false,
    similar: []
};
