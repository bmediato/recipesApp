import React, { Component } from 'react';

export default class ButtonStartRecipe extends Component {
  render() {
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button__start__recipe"
      >
        Start Recipe
      </button>
    );
  }
}
