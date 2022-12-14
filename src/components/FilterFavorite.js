import React, { Component } from 'react';
// import mealIcon from '../images/mealIcon.svg';
// import drinkIcon from '../images/drinkIcon.svg';
import cocktail from '../images/cocktail.png';
import garfo from '../images/garfo.png';
import hamburguer from '../images/hamburguer.png';
import './css/Favorite.css';

export default class FilterFavorite extends Component {
  render() {
    return (
      <section className="section">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="btnB"
          // onClick={ this.btnAll }
        >
          <img
            src={ garfo }
            alt="ShareIcon"
            className="garfo"
          />

        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className="btnB"
          // onClick={ this.btnMeals }
        >
          <img
            src={ hamburguer }
            alt="ShareIcon"
            className="hamburguer"
          />

        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          // onClick={ this.btnDrinks }
          className="btnB"
        >
          <img
            className="suco"
            src={ cocktail }
            alt="ShareIcon"
          />

        </button>
      </section>
    );
  }
}
