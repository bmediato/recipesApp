import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import searchIcon from '../images/searchIcon.svg';
// import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import './css/Header.css';
import Vector from '../images/Vector.png';
import bandejaCom from '../images/bandejaCom.png';
import lupa from '../images/lupa.png';
import profile from '../images/profile.png';
import prato from '../images/prato.png';

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
        <div className="container-header">
          <img src={ bandejaCom } alt="bandeja" className="bandeja" />
          <img src={ Vector } alt="coração" className="vector" />
          <h3 className="title-rec">RECIPES app</h3>
          <div className="img-btn">
            {imgProfile
        && (
          <a href="/profile">
            <img
              src={ profile }
              alt="profileIcon"
              data-testid="profile-top-btn"
              className="profile-btn"
            />

          </a>
        )}
            {imgSearch
        && (
          <button
            type="button"
            id="button__seach"
            className="btn-lupa"
            onClick={ () => {
              this.setState({
                isSearching: !isSearching,
              });
            } }
          >
            <img
              data-testid="search-top-btn"
              src={ lupa }
              alt="searchIcon"
              className="lupa"
            />
          </button>
        )}
            {isSearching && <SearchBar history={ history } />}
          </div>
        </div>
        <div className="title-all">

          <img src={ prato } alt="prato" className="prato" />
          <h1 data-testid="page-title" className="page-title">
            {title}
          </h1>
        </div>
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
