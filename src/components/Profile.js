import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './css/Profile.css';
import check from '../images/check.png';
import fav from '../images/fav.png';
import logout from '../images/logout.png';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    this.getEmail();
  }

  btnDoneRecipes = () => {
    const { history } = this.props;
    history.push('/done-recipes');
  };

  btnFavoriteRecipes = () => {
    const { history } = this.props;
    history.push('/favorite-recipes');
  };

  btnLogout = () => {
    const { history } = this.props;
    history.push('/');
    localStorage.clear();
  };

  getEmail = () => {
    const user = JSON.parse(localStorage.getItem('user'))
      || { email: 'login não cadastrado' };
    const { email } = user;
    this.setState({ email });
  };

  render() {
    const { history } = this.props;
    const { email } = this.state;

    return (
      <div>
        <Header
          history={ history }
          title="Profile"
          imgProfile
          imgSearch={ false }
        />
        <div>
          <div data-testid="profile-email" className="email">
            { email }
          </div>
          <div className="buttonsDFL">
            <button
              type="button"
              data-testid="profile-done-btn"
              onClick={ this.btnDoneRecipes }
              className="doneRecipes"
            >
              <img
                src={ check }
                alt="done recipes"
                className="imgDone"
              />
              Done Recipes
            </button>
            <hr />
            <button
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ this.btnFavoriteRecipes }
              className="favRec"
            >
              <img src={ fav } alt="fav recipes" className="imgF" />
              Favorite Recipes
            </button>
            <hr />
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ this.btnLogout }
              className="logout"
            >
              <img src={ logout } alt="logout" className="imgL" />
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default (Profile);
