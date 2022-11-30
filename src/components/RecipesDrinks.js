import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';

class RecipesDrinks extends Component {
  render() {
    const { history } = this.props;
    return (<Header
      history={ history }
      title="Drinks"
      imgProfile
      imgSearch
    />);
  }
}

RecipesDrinks.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default RecipesDrinks;
