import React, { Component } from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

class Header extends Component {
  // HeaderTitle = () => {
  //   const { history } = this.props;
  //   const { location: { pathname } } = history;
  // };

  // IconSeach = () => {
  //   const { history } = this.props;
  //   const { location: { pathname } } = history;
  //   if (imgProfile) {
  //     return (

  //     );
  //   }
  // };

  render() {
    // console.log(this.HeaderTitle);
    const { title, imgProfile, imgSearch } = this.props;
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
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
          />
        )}

        {/* {this.IconSeach()} */}
      </header>
    );
  }
}

Header.propTypes = {}.isRequired;

export default Header;
