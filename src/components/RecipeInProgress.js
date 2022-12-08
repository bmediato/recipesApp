import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drinkID } from '../services/drinkAPI';
import { foodID } from '../services/foodAPI';
import ButtonShare from './Buttons/ButtonShare';
import ButtonFavorite from './Buttons/ButtonFavorite';

class RecipeInProgress extends Component {
  state = {
    recipe: {},
  };

  async componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = async () => {
    const { match: { url, params: { id } } } = this.props;
    if (url.includes('meals')) {
      const [recipe] = await foodID(id);
      return this.setState({ recipe });
    }
    const [recipe] = await drinkID(id);
    return this.setState({ recipe });
  };

  render() {
    const { recipe } = this.state;
    return (
      <>
        <div key={ recipe.idMeal || recipe.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
          <h4 data-testid="recipe-category">
            { recipe.strAlcoholic || recipe.strCategory}
          </h4>
          <h4
            data-testid="instructions"
          >
            {recipe.strInstructions}
          </h4>
        </div>
        <ButtonShare />
        <ButtonFavorite receitas={ recipe } testId="favorite-btn" />
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar receita

        </button>
      </>
    );
  }
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
