import React, { Component } from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

class Header extends Component {
  HeaderTitle = () => {
    const { history } = this.props;
    const { location: { pathname } } = history;
    if (pathname === '/meals') {
      return 'Meals';
    } if (pathname === '/drinks') {
      return 'Drinks';
    } if (pathname === '/profile') {
      return 'Profile';
    } if (pathname === '/done-recipes') {
      return 'Done Recipes';
    } if (pathname === '/favorite-recipes') {
      return 'Favorite Recipes';
    }
  };

  IconSeach = () => {
    const { history } = this.props;
    const { location: { pathname } } = history;
    if (pathname === '/meals' || pathname === '/drinks') {
      return (
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="searchIcon"
        />
      );
    }
  };

  render() {
    console.log(this.HeaderTitle);
    return (
      <header>
        <h1 data-testid="page-title">
          {this.HeaderTitle()}
        </h1>
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
        {this.IconSeach()}
      </header>
    );
  }
}

Header.propTypes = {}.isRequired;

export default Header;
