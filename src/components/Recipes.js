import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMealsCategories,
  getMeal,
  searchCategoriesMeals } from '../services/foodAPI';
import { savePage, saveRecipes } from '../redux/actions';
import Header from './Header';
import { getDrink,
  getDrinksCategories,
  searchCategoriesDrink } from '../services/drinkAPI';
import Footer from './Footer';

class Recipes extends Component {
  state = {
    categories: [],
    defaultRecipes: [],
    selectedRadio: '',
  };

  async componentDidMount() {
    const { history, dispatch } = this.props;
    const url = history.location.pathname;
    const link = url.slice(1);
    dispatch(savePage(link));
    const NUMBER_MAX_ARRAY = 5;
    let categories = [];
    if (url === '/meals') {
      categories = await getMealsCategories();
      const recipes = await getMeal();
      this.setState({ defaultRecipes: recipes });
      dispatch(saveRecipes(recipes));
    }
    if (url === '/drinks') {
      categories = await getDrinksCategories();
      const recipes = await getDrink();
      this.setState({ defaultRecipes: recipes });
      dispatch(saveRecipes(recipes));
    }
    categories.splice(NUMBER_MAX_ARRAY, categories.length - 1);
    this.setState({ categories });
  }

  allFilters = () => {
    const { defaultRecipes } = this.state;
    const { dispatch } = this.props;
    dispatch(saveRecipes(defaultRecipes));
  };

  onClickRadioButton = async ({ target }) => {
    const { page, dispatch } = this.props;
    const { selectedRadio, defaultRecipes } = this.state;
    if (selectedRadio === target.value) {
      dispatch(saveRecipes(defaultRecipes));
      return this.setState({ selectedRadio: '' });
    }
    this.setState({ selectedRadio: target.value });

    if (page === 'drinks') {
      const recipes = await searchCategoriesDrink(target.value);
      return dispatch(saveRecipes(recipes));
    }
    const recipes = await searchCategoriesMeals(target.value);
    return dispatch(saveRecipes(recipes));
  };

  linkNames = (id) => {
    const { page } = this.props;
    if (page === 'meals') {
      return `meals/${id}`;
    }
    return `drinks/${id}`;
  };

  render() {
    const { history, page, recipes } = this.props;
    const { categories } = this.state;

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
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ this.allFilters }
          >
            All
          </button>

          { categories.map((category) => (
            <label htmlFor={ category.strCategory } key={ category.strCategory }>
              {category.strCategory}
              <input
                type="radio"
                data-testid={ `${category.strCategory}-category-filter` }
                id={ category.strCategory }
                name="radioInput"
                value={ category.strCategory }
                onClick={ this.onClickRadioButton }
              />
            </label>))}
        </form>
        <ul>
          {
            recipes.slice(0, max).map((element, index) => (
              <li data-testid={ `${index}-recipe-card` } key={ index }>
                <Link to={ this.linkNames(element.idMeal || element.idDrink) }>
                  <img
                    alt={ `Recipes ${page}` }
                    src={ element.strDrinkThumb || element.strMealThumb }
                    data-testid={ `${index}-card-img` }
                  />
                </Link>
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
  recipes: PropTypes.shape({
    slice: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  page: state.searchRecipes.page,
  recipes: state.searchRecipes.recipes,
});

export default connect(mapStateToProps)(Recipes);
