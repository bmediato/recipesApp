import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Filter from './Filter';

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

  linkNames = (id) => {
    const { page } = this.props;
    if (page === 'meals') {
      return `meals/${id}`;
    }
    return `drinks/${id}`;
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
              <li key={ index }>
                <Link to={ this.linkNames(element.idMeal || element.idDrink) }>
                  <img
                    src=""
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>

                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${element.nationality} - ${element.category}`}
                </p>

                <Link to={ this.linkNames(element.idMeal || element.idDrink) }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {element.name}
                  </p>
                </Link>

                {/* <Share /> */}
                {/* <Favorite /> */}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
FavoriteRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
  page: PropTypes.string.isRequired,
};
export default FavoriteRecipes;
