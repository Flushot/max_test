import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import anonymous from '../anonymous.png';


export default class ArtistTile extends Component {
    render() {
        const artist = this.props.artist;

        return (
            <div className={classNames('artist-tile', { selected: this.props.isSelected })}
                 onClick={this.props.onClick}>
                <img src={artist.image || anonymous}
                     alt={artist.name}
                     title={artist.name}
                     className="artist-image"/>
                <div className="artist-name">{artist.name}</div>
            </div>
        );
    }
}


ArtistTile.propTypes = {
    artist: PropTypes.object.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func
};

ArtistTile.defaultProps = {
    isSelected: false,
    onClick: () => {}
};
