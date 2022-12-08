import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Filter from './Filter';
import Card from './Card';

class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.state = {
      favoriteRecipes: [],
    };
  }

  componentDidMount() {
    this.getFavoriteRecipes();
  }

  getFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipes;
  };

  render() {
    const { history } = this.props;
    const { favoriteRecipes } = this.state;

    return (
      <div>
        <Header
          history={ history }
          title="Favorite Recipes"
          imgProfile
          imgSearch={ false }
        />
        <Filter />
        <ul>
          {
            favoriteRecipes.map((element, index) => (
              <Card key={ index } />
            ))
          }
          {/* <Share /> */}
          {/* <Favorite /> */}

        </ul>

      </div>
    );
  }
}
FavoriteRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default FavoriteRecipes;
