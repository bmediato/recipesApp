import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getDrinkFirstLetter,
  getDrinkIngredient,
  getDrinkName } from '../services/drinkAPI';
import {
  getFoodFirstLetter,
  getFoodIngredient,
  getFoodName } from '../services/foodAPI';

class SearchBar extends Component {
  state = {
    recipes: [],
    searchInput: '',
    radioValue: '',
  };

  isButtonDisabled = () => {
    const { searchInput, radioValue } = this.state;
    const isSearchValueValid = searchInput.length > 0;
    const isradioValueValid = radioValue.length > 0;
    return isSearchValueValid && isradioValueValid;
  };

  fetchRecipes = async () => {
    const { page } = this.props;
    const { radioValue, searchInput } = this.state;
    if (page === 'meals') {
      switch (radioValue) {
      case 'ingredient':
        return getFoodIngredient(searchInput);
      case 'name':
        return getFoodName(searchInput);
      default:
        return getFoodFirstLetter(searchInput);
      }
    }
    switch (radioValue) {
    case 'ingredient':
      return getDrinkIngredient(searchInput);
    case 'name':
      return getDrinkName(searchInput);
    default:
      return getDrinkFirstLetter(searchInput);
    }
  };

  handleRadioButton = ({ target }) => {
    this.setState({
      radioValue: target.value,
    });
  };

  handleButtonClick = async () => {
    const { history, page } = this.props;
    const NUMBER_MAX_ARRAY = 11;
    const recipes = await this.fetchRecipes();
    if (recipes.length > NUMBER_MAX_ARRAY) {
      /* Aqui o splice serve para caso o array seja maior do que 12,
      ele vai retirar os elementos do indice 12 até o ultimo */
      recipes
        .splice(NUMBER_MAX_ARRAY + 1, recipes.length - 1);
    }
    switch (recipes.length) {
    case 0:
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    case 1:
    {
      const recipeId = recipes[0].idMeal || recipes[0].idDrink;
      return history.push(`${page}/${recipeId}`);
    }
    default:
      return this.setState({ recipes });
    }
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { searchInput, recipes } = this.state;
    return (
      <>
        <form>
          <input
            data-testid="search-input"
            placeholder="Search"
            type="text"
            name="searchInput"
            value={ searchInput }
            onChange={ this.onInputChange }
          />

          <label htmlFor="ingredient">
            Ingredient
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="radioInput"
              value="ingredient"
              onClick={ this.handleRadioButton }
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="radioInput"
              value="name"
              onClick={ this.handleRadioButton }
            />
          </label>
          <label htmlFor="firstLetter">
            First letter
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="firstLetter"
              name="radioInput"
              value="firstLetter"
              onClick={ this.handleRadioButton }
            />
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
            onClick={ this.handleButtonClick }
            disabled={ !this.isButtonDisabled() }
          >
            Search
          </button>
        </form>
        {recipes.map((recipe, i) => (
          <section
            data-testid={ `${i}-recipe-card` }
            key={ recipe.idMeal || recipe.idDrink }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt="Imagem ilustrativa da receita"
            />
            <div
              data-testid={ `${i}-card-name` }
            >
              { recipe.strMeal || recipe.strDrink }
            </div>
          </section>
        ))}
      </>
    );
  }
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    push: PropTypes.func,
  }).isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.searchRecipes.page,
});

export default connect(mapStateToProps)(SearchBar);
