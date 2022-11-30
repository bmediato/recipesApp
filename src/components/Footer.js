import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
        <a href="/drink">
          <img
            src="../images/drinkIcon.svg"
            alt="DrinkIcon"
            data-testid="drinks-bottom-btn"
          />
        </a>
        <a href="/meal">
          <img
            src="../images/mealIcon.svg"
            alt="MealIcon"
            data-testid="meals-bottom-btn"
          />
        </a>
      </footer>
    );
  }
}
