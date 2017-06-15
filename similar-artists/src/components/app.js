import React, {Component} from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';
import logo from '../logo.png';
import './app.css';
import * as Actions from '../actions';
import store from '../store';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo"/>
                    <h2>Similar Artists</h2>
                </div>

                <div className="search-panel">
                    <label>
                        Artist:&nbsp;
                        <Autocomplete
                            getItemValue={artist => artist.id}
                            items={store.getState().search.results}
                            renderItem={(artist, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                    <img src={artist.image} style={{width: '30px', align: 'middle'}}/>
                                    {artist.name}
                                </div>
                            }
                            value={this.props.state.search.term || ''}
                            onChange={e => this.props.dispatch(Actions.searchArtist(e.target.value))}
                            onSelect={(artistId, artist) => this.props.dispatch(Actions.selectArtist(artistId))}/>
                    </label>
                </div>

                {this.props.state.selection.artistId ? (
                <div className="selection-panel">
                    {this.props.state.selection.busy ? (
                        <span>Loading...</span>
                    ) : (
                        <div>
                            <img src={this.props.state.selection.artist.image} style={{maxHeight: '100px'}}/><br/>
                            <table>
                                <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{this.props.state.selection.artist.name}</td>
                                </tr>
                                <tr>
                                    <th>Popularity</th>
                                    <td>{this.props.state.selection.artist.popularity}</td>
                                </tr>
                                <tr>
                                    <th>Genres</th>
                                    <td>
                                        <ul>
                                            {this.props.state.selection.artist.genres.map(genre => {
                                                return <li>{genre}</li>;
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Similar Artists</th>
                                    <td>
                                        <ul>
                                            {this.props.state.selection.similar.map(artist => {
                                                return (
                                                    <li>
                                                        <a href="#" onClick={this.onArtistClicked.bind(this, artist.id)}>{artist.name}</a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                ) : ''}
            </div>
        );
    }

    onArtistClicked(artistId, e) {
        e.preventDefault();
        this.props.dispatch(Actions.selectArtist(artistId));
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default connect(mapStateToProps)(App);
