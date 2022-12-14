import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../css/RecipeDetails.css';
import gostar from '../../images/gostar.png';
import gostarWhite from '../../images/gostarWhite.png';

export default class ButtonFavorite extends Component {
  state = {
    isFavorited: false,
  };

  componentDidMount() {
    this.checkFavorited();
  }

  saveRecipe = () => {
    const { receitas } = this.props;
    const oldLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const obj = {
      id: receitas.idDrink || receitas.idMeal,
      type: receitas.idDrink ? 'drink' : 'meal',
      nationality: receitas.strArea || '',
      category: receitas.strCategory || '',
      alcoholicOrNot: receitas.strAlcoholic || '',
      name: receitas.strDrink || receitas.strMeal,
      image: receitas.strDrinkThumb || receitas.strMealThumb,
    };
    const newLocalStorage = [...oldLocalStorage, obj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    this.checkFavorited();
  };

  deleteRecipe = () => {
    const { receitas } = this.props;
    const oldLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(oldLocalStorage);
    const newLocalStorage = oldLocalStorage
      .filter((recipe) => {
        if (receitas.idDrink) return recipe.id !== receitas.idDrink;
        if (receitas.idMeal) return recipe.id !== receitas.idMeal;
        return recipe.id !== receitas.id;
      });
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    this.checkFavorited();
  };

  checkFavorited = () => {
    const { receitas } = this.props;
    const oldLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorited = oldLocalStorage.some((recipe) => {
      if (receitas.idDrink || receitas.idMeal) {
        return recipe.id === receitas.idMeal
    || recipe.id === receitas.idDrink;
      }
      return recipe.id === receitas.id;
    });

    this.setState({ isFavorited });
  };

  render() {
    const { isFavorited } = this.state;
    const { testId } = this.props;
    return (
      <button
        data-testid={ testId }
        type="button"
        onClick={ isFavorited ? this.deleteRecipe : this.saveRecipe }
        src={ isFavorited ? gostar : gostarWhite }
        className="btnFav"
      >
        <img
          src={ isFavorited ? gostar : gostarWhite }
          alt="FavoriteIcon"
        />
      </button>
    );
  }
}

ButtonFavorite.propTypes = {
  receitas: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  testId: PropTypes.string.isRequired,
};
