import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

class Filter extends Component {
  btnAll = () => {
    // remove os filtros,retorna todas as receitas
  };

  btnMeals = () => {
    // retorna todas as receitas de comida
  };

  btnDrinks = () => {
    // retorna todas as receitas de bebidas
  };

  render() {
    return (

      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ this.btnAll }
        >
          All
          <img
            src={ rockGlass }
            alt="ShareIcon"
          />
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ this.btnMeals }
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
          onClick={ this.btnDrinks }
        >
          Drinks
          <img
            src={ drinkIcon }
            alt="ShareIcon"
          />
        </button>
      </div>
    );
  }
}

export default Filter;
