import React, { Component } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isSearching: false,
    };
  }

  render() {
    const { title, imgProfile, imgSearch, history } = this.props;
    const { isSearching } = this.state;
    return (
      <header>
        <h1 data-testid="page-title">
          {title}
        </h1>

        {imgProfile
        && (
          <a href="/profile">
            <img
              src={ profileIcon }
              alt="profileIcon"
              data-testid="profile-top-btn"
            />

          </a>
        )}
        {imgSearch
        && (
          <button
            type="button"
            id="button__seach"
            onClick={ () => {
              this.setState({
                isSearching: !isSearching,
              });
            } }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="searchIcon"
            />
          </button>
        )}
        {isSearching && <SearchBar history={ history } />}
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  imgProfile: PropTypes.bool.isRequired,
  imgSearch: PropTypes.bool.isRequired,
};

export default Header;
