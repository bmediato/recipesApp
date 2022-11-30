import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class FavoriteRecipes extends Component {
  render() {
    const { history } = this.props;

    return (<Header
      history={ history }
      title="Favorite Recipes"
      imgProfile
      imgSearch={ false }
    />);
  }
}
FavoriteRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default FavoriteRecipes;
