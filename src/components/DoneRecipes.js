import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class DoneRecipes extends Component {
  render() {
    const { history } = this.props;

    return (<Header
      history={ history }
      title="Done Recipes"
      imgProfile
      imgSearch={ false }
    />);
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default DoneRecipes;
