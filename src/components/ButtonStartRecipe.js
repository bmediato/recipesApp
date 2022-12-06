import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ButtonStartRecipe extends Component {
  state = {
    recipeIsDone: false,
    recipeInProgress: false,
  };

  componentDidMount() {
    this.isRecipeDone();
    this.isRecipeInProgress();
  }

  isRecipeDone = () => {
    const { id } = this.props;
    /* recipesLocalStorage vai tentar pegar as receitas do localStorage caso a chave não exista
    ele vai ficar como um array vazio, apenas para não quebrar o código */
    const allRecipesDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipeIsDone = allRecipesDone.some((recipe) => recipe.id === id);
    return this.setState({ recipeIsDone });
  };

  isRecipeInProgress = () => {
    const { id } = this.props;
    const allRecipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
    const values = Object.values(allRecipesInProgress);

    const verificaIds = () => values.some((elements) => {
      const ids = Object.keys(elements);
      return ids.includes(id);
    });

    if (verificaIds()) {
      return this.setState({ recipeInProgress: true });
    }
    return this.setState({ recipeInProgress: false });
  };

  render() {
    const { recipeInProgress, recipeIsDone } = this.state;
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button__start__recipe"
        style={ { display: recipeIsDone ? 'none' : 'flex' } }
      >
        {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    );
  }
}

ButtonStartRecipe.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ButtonStartRecipe;
