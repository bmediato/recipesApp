import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ButtonStartRecipe extends Component {
  isRecipeDone = () => {
    const { id } = this.props;
    /* recipesLocalStorage vai tentar pegar as receitas do localStorage caso a chave não exista
    ele vai ficar como um array vazio, apenas para não quebrar o código */
    const recipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    return recipesLocalStorage.some((recipe) => recipe.id === id);
  };

  render() {
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button__start__recipe"
        style={ { display: this.isRecipeDone() ? 'none' : 'flex' } }
      >
        Start Recipe
      </button>
    );
  }
}

ButtonStartRecipe.propTypes = {
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.searchRecipes.id,
});

export default connect(mapStateToProps)(ButtonStartRecipe);
