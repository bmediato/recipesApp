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
import { saveRecipes } from '../redux/actions';

class SearchBar extends Component {
  state = {
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
    const { history, page, dispatch } = this.props;
    const recipes = await this.fetchRecipes();
    switch (recipes.length) {
    case 0:
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    case 1:
    {
      const recipeId = recipes[0].idMeal || recipes[0].idDrink;
      return history.push(`${page}/${recipeId}`);
    }
    default:
      return dispatch(saveRecipes(recipes));
    }
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { searchInput } = this.state;
    return (
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
  dispatch: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  page: state.searchRecipes.page,
});

export default connect(mapStateToProps)(SearchBar);
