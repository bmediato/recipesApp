import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class RecipesDrinks extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header
          history={ history }
          title="Drinks"
          imgProfile
          imgSearch
        />
        <Footer />
      </div>
    );
  }
}

RecipesDrinks.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default RecipesDrinks;
