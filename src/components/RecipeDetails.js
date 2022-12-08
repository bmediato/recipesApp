/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ButtonStartRecipe from './Buttons/ButtonStartRecipe';
import ButtonFavorite from './Buttons/ButtonFavorite';
import { foodID, getMeal } from '../services/foodAPI';
import { drinkID, getDrink } from '../services/drinkAPI';
import './css/buttonStart.css';
import ButtonShare from './Buttons/ButtonShare';

export default function RecipeDetails({ value }) {
  // const carregando = 'carregando...';
  const [recomendation, setRecomendation] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const num = 6;
  const history = useHistory();
  const location = history.location.pathname;
  const id = location.split('/')[2];

  const fetchId = async () => {
    if (value === 'meals') {
      const food = await foodID(id);
      setReceitas(food);
      const getD = await getDrink();
      setRecomendation(getD);
    } if (value === 'drinks') {
      const drinks = await drinkID(id);
      setReceitas(drinks);
      const getM = await getMeal();
      setRecomendation(getM);
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  const listIng = (receita) => {
    const recipesIngr = Object.keys(receita).filter((e) => receita[e] !== null)
      .filter((item) => receita[item] !== '').filter((i) => i.includes('strIngredient'));
    return recipesIngr;
  };

  const listMeasure = (receita) => {
    const recipesMs = Object.keys(receita).filter((e) => receita[e] !== null)
      .filter((item) => receita[item] !== '').filter((i) => i.includes('strMeasure'));
    return recipesMs;
  };

  return receitas.map((recipe) => (
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
        <div>
          <ul>
            {listIng(recipe).map((item, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${recipe[listMeasure(recipe)[index]]}: ${recipe[item]}`}

              </li>
            ))}
          </ul>
        </div>
        <h4
          data-testid="instructions"
        >
          {recipe.strInstructions}
        </h4>
        {recipe.strYoutube && (
          <iframe
            data-testid="video"
            title={ recipe.strMeal }
            width="420"
            height="315"
            src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
          />
        )}
      </div>
      <div className="rec">
        {recomendation ? recomendation.slice(0, num)
          .map((item, index) => ((item.strMeal === undefined) ? (
            <div key={ `drink ${index}` } data-testid={ `${index}-recommendation-card` }>
              <h1 data-testid={ `${index}-recommendation-title` }>{item.strDrink}</h1>
              <img
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                style={ { maxWidth: '180px' } }
              />
            </div>)
            : (
              <div key={ `meal ${index}` } data-testid={ `${index}-recommendation-card` }>
                <h1 data-testid={ `${index}-recommendation-title` }>{item.strMeal}</h1>
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  style={ { maxWidth: '200px' } }
                />
              </div>
            ))) : null}
      </div>

      <ButtonStartRecipe id={ id } history={ history } />
      <ButtonShare />
      <ButtonFavorite receitas={ recipe } testId="favorite-btn" />
    </>
  ));
}

RecipeDetails.propTypes = {
  value: PropTypes.string.isRequired,
};
