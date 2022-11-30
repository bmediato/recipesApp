import React, { Component } from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
        <a href="/drinks">
          <img
            src={ drinkIcon }
            alt="DrinkIcon"
            data-testid="drinks-bottom-btn"
          />
        </a>
        <a href="/meals">
          <img
            src={ mealIcon }
            alt="MealIcon"
            data-testid="meals-bottom-btn"
          />
        </a>
      </footer>
    );
  }
}
