import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

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
    const { history } = this.props;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error('Faça o login');
      }
      const { email } = user;
      this.setState({ email });
    } catch (error) {
      console.error(error);
      history.push('/');
    }
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
          <div data-testid="profile-email">
            { email }
          </div>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ this.btnDoneRecipes }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ this.btnFavoriteRecipes }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.btnLogout }
          >
            Logout
          </button>
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
