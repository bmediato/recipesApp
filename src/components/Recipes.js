import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFoodDrinksCategories, getFoodMealsCategories } from '../services/foodAPI';

export default class Recipes extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const url = history.location.pathname;
    const NUMBER_MAX_ARRAY = 5;
    let categories = [];
    if (url === '/meals') {
      categories = await getFoodMealsCategories();
    }
    if (url === '/drinks') {
      categories = await getFoodDrinksCategories();
    }
    categories.splice(NUMBER_MAX_ARRAY, categories.length - 1);
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <form>
          { categories.map((category) => (
            <label htmlFor="categories" key={ category.strCategory }>
              {category.strCategory}
              <input
                type="radio"
                data-testid={ `${category.strCategory}-category-filter` }
                id="categories"
                name="radioInput"
                value={ category.strCategory }
              />
            </label>))}
        </form>
      </div>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
