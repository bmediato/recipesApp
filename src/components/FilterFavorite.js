import React, { Component } from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default class FilterFavorite extends Component {
  render() {
    return (
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          // onClick={ this.btnAll }
        >
          All
          <img
            src={ drinkIcon }
            alt="ShareIcon"
          />
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          // onClick={ this.btnMeals }
        >
          Meals
          <img
            src={ mealIcon }
            alt="ShareIcon"
          />
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          // onClick={ this.btnDrinks }
        >
          Drinks
          <img
            src={ drinkIcon }
            alt="ShareIcon"
          />
        </button>
      </section>
    );
  }
}
