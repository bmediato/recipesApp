import PropTypes from 'prop-types';
import React, { Component } from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default class ButtonFavorite extends Component {
  saveRecipe = () => {
    const { receitas } = this.props;
    console.log(receitas);
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
  };

  render() {
    return (
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ this.saveRecipe }
      >
        <img
          src={ whiteHeartIcon }
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
  }).isRequired,
};
