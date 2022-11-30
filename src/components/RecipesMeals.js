import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';

class RecipesMeals extends Component {
  render() {
    const { history } = this.props;
    return (<Header
      history={ history }
      title="Meals"
      imgProfile
      imgSearch
    />);
  }
}

RecipesMeals.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default RecipesMeals;
