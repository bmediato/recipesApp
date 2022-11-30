import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFoodIngredient } from '../services/FoodAPI';

class BarraDeBusca extends Component {
  state = {
    searchInput: '',
    ingredient: '',
    name: '',
    firstLetter: '',
  };

  handleRadioButton = async () => {
    const { dispatch } = this.props;
    const { searchInput, ingredient, name, firstLetter } = this.state;

    dispatch(fetchRecipes({ searchInput, ingredient, name, firstLetter }));
    }
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { searchInput, ingredient, name, firstLetter } = this.state;
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
            name="ingredient"
            value={ ingredient }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="name"
            value={ name }
          />
        </label>
        <label htmlFor="firstLetter">
          First letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="firstLetter"
            name="firstLetter"
            value={ firstLetter }
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

export default connect(mapStateToProps)(BarraDeBusca);