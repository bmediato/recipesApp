import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class RecipesMeals extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header
          history={ history }
          title="Meals"
          imgProfile
          imgSearch
        />
        <Footer />
      </div>
    );
  }
}

RecipesMeals.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default RecipesMeals;
