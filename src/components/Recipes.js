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
import './css/Recipes.css';
import salada from '../images/salada.png';
import vaca from '../images/vaca.png';
import breakfast from '../images/breakfast.png';
import chicken from '../images/chicken.png';
import dessert from '../images/dessert.png';
import goat from '../images/goat.png';

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
    const icons = [
      <img src={ vaca } alt="beef" key={ 0 } className="vaca" />,
      <img src={ breakfast } alt="cafe " key={ 1 } className="pao" />,
      <img src={ chicken } alt="chicken" key={ 2 } className="galinha" />,
      <img src={ dessert } alt="dessert" key={ 3 } className="sobremesa" />,
      <img src={ goat } alt="dessert" key={ 4 } className="goat" />,
    ];
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
            className="btn-all"
          >
            <img src={ salada } alt="comida" className="salada" />
          </button>

          { categories.map((category, index) => (
            <label htmlFor={ category.strCategory } key={ category.strCategory }>
              {icons[index]}
              <input
                type="radio"
                data-testid={ `${category.strCategory}-category-filter` }
                id={ category.strCategory }
                name="radioInput"
                value={ category.strCategory }
                onClick={ this.onClickRadioButton }
                className="foods"
              />
            </label>))}
        </form>
        <ul className="ul-food">
          {
            recipes.slice(0, max).map((element, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ index }
                className="recipes-food"
              >
                <Link to={ this.linkNames(element.idMeal || element.idDrink) }>
                  <img
                    alt={ `Recipes ${page}` }
                    src={ element.strDrinkThumb || element.strMealThumb }
                    data-testid={ `${index}-card-img` }
                    className="img-fod"
                  />
                </Link>
                <p
                  data-testid={ `${index}-card-name` }
                  className="paragrafo"
                >
                  { element.strDrink || element.strMeal }
                </p>
              </div>
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
