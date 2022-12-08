import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Filter from './Filter';
import Card from './Card';

class DoneRecipes extends Component {
  constructor() {
    super();
    this.state = {
      doneRecipes: [],
    };
  }

  componentDidMount() {
    this.getDoneRecipes();
  }

  getDoneRecipes = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipes;
  };

  render() {
    const { history } = this.props;
    const { doneRecipes } = this.state;

    return (
      <div>
        <Header
          history={ history }
          title="Done Recipes"
          imgProfile
          imgSearch={ false }
        />
        <Filter />
        <ul>
          {
            doneRecipes.map((element, index) => (
              <Card key={ index } />
            ))
          }
          {/* <Share /> */}
        </ul>
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default DoneRecipes;
