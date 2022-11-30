import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePage } from '../redux/actions';
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

  componentDidMount() {
    const { dispatch, history } = this.props;
    const url = history.location.pathname;
    const page = url.slice(1);
    dispatch(savePage(page));
  }

  fetchRecipes = async () => {
    const { radioValue, searchInput } = this.state;
    if (page === 'meals') {
      switch (radioValue) {
      case 'ingredient':
        return getFoodIngredient(searchInput);
      case 'name':
        return getFoodName(searchInput);
      case 'firstLetter':
        return getFoodFirstLetter(searchInput);
      default:
        break;
      }
    }
    switch (radioValue) {
    case 'ingredient':
      return getDrinkIngredient(searchInput);
    case 'name':
      return getDrinkName(searchInput);
    case 'firstLetter':
      return getDrinkFirstLetter(searchInput);
    default:
      break;
    }
  };

  handleRadioButton = ({ target }) => {
    this.setState({
      radioValue: target.value,
    });
  };

  handleButtonClick = async () => {
    const recipes = await this.fetchRecipes();
    this.setState({ recipes });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { searchInput, recipes } = this.state;
    return (
      <form>
        <input
          data-testid="searchInput"
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
        >
          Search
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps)(SearchBar);
