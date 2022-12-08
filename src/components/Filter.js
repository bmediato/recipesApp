import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Filter extends Component {
  btnAll = () => {
    // remove os filtros, retorna todas as receitas feitas
  };

  btnMeals = () => {
    // retorna todas as receitas de comida feitas
  };

  btnDrinks = () => {
    // retorna todas as receitas de bebidas feitas
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
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ this.btnMeals }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ this.btnDrinks }
        >
          Drinks
        </button>
      </div>
    );
  }
}

export default Filter;