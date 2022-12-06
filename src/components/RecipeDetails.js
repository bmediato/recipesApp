import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { foodID } from '../services/foodAPI';
import { drinkID } from '../services/drinkAPI';
import ButtonStartRecipe from './ButtonStartRecipe';
import './css/buttonStart.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeDetails({ value }) {
  const history = useHistory();
  const location = history.location.pathname;
  const id = location.split('/')[2];

  const fetchId = async () => {
    if (value === 'meals') {
      const food = await foodID(id);
      console.log(food);
    } if (value === 'drinks') {
      const drinks = await drinkID(id);
      console.log(drinks);
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  return (
    <>
      <div>RecipeDetails</div>

      <ButtonStartRecipe id={ id } />

      <button data-testid="share-btn" type="button">
        <img
          src={ shareIcon }
          alt="ShareIcon"
        />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img
          src={ whiteHeartIcon }
          alt="ShareIcon"
        />
      </button>
    </>
  );
}

RecipeDetails.propTypes = {}.isRequired;
