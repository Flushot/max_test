import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: (props.term || '')
        };
    }

    componentDidMount() {
        this.searchText.focus();
    }

    render() {
        return (
            <div className="search-input">
                <input type="text"
                       ref={input => { this.searchText = input; }}
                       value={this.state.term}
                       onChange={event => this.setState({ term: event.target.value })}
                       onKeyPress={this.onKeyPress.bind(this)}
                       placeholder="Artist name..."/>
                <button onClick={this.onSearchClick.bind(this)}
                        disabled={this.props.isBusy}>Search</button>
                {this.props.error ? (
                    <div className="error">
                        Error {this.props.error.code}:&nbsp;
                        {this.props.error.message}
                    </div>
                ) : ''}
            </div>
        );
    }

    /**
     * Search input key pressed.
     *
     * @param {Event} event
     */
    onKeyPress(event) {
        if (isEnterKey(event)) {
            event.preventDefault();
            this.doSearch();
        }
    }

    /**
     * Search button clicked.
     *
     * @param {Event} event
     */
    onSearchClick(event) {
        event.preventDefault();
        this.doSearch();
    }

    doSearch() {
        this.props.onSearch(this.state.term);
    }
}


SearchInput.propTypes = {
    onSearch: PropTypes.func.isRequired,
    isBusy: PropTypes.bool
};

SearchInput.defaultProps = {
    term: '',
    isBusy: false
};


/**
 * Does a given keypress event represent the ENTER key being pressed?
 *
 * @param {Event} event keypress event to check.
 * @returns {boolean} whether or not this was an ENTER key event.
 */
function isEnterKey(event) {
    if (typeof event.key !== 'undefined') {
        return event.key === 'Enter';
    } else {
        return event.keyCode === 13;
    }
}
