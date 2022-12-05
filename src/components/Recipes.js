import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDrinksCategories, getMealsCategories, getMeal } from '../services/foodAPI';
import { savePage } from '../redux/actions';
import Header from './Header';
import { getDrink } from '../services/drinkAPI';
import Footer from './Footer';

class Recipes extends Component {
  state = {
    categories: [],
    recipes: [],
  };

  async componentDidMount() {
    const { history, dispatch } = this.props;
    const url = history.location.pathname;
    const link = url.slice(1);
    dispatch(savePage(link));
    const NUMBER_MAX_ARRAY = 5;
    let categories = [];
    let recipes = [];
    if (url === '/meals') {
      categories = await getMealsCategories();
      recipes = await getMeal();
    }
    if (url === '/drinks') {
      categories = await getDrinksCategories();
      recipes = await getDrink();
    }
    categories.splice(NUMBER_MAX_ARRAY, categories.length - 1);
    this.setState({ categories, recipes });
  }

  render() {
    const { history, page } = this.props;
    const { categories, recipes } = this.state;
    const max = 12;
    return (
      <div>
        <Header
          history={ history }
          title={ page === 'meals' ? 'Meals' : 'Drinks' }
          imgProfile
          imgSearch
        />
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
        <ul>
          {
            recipes.slice(0, max).map((element, index) => (
              <li data-testid={ `${index}-recipe-card` } key={ index }>
                <img
                  alt={ `Recipes ${page}` }
                  src={ element.strDrinkThumb || element.strMealThumb }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { element.strDrink || element.strMeal }
                </p>
              </li>
            ))
          }
        </ul>
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.searchRecipes.page,
});

export default connect(mapStateToProps)(Recipes);
