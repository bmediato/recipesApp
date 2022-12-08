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
  const carregando = 'carregando...';
  const [recomendation, setRecomendation] = useState([]);
  const [receitas, setReceitas] = useState({ strMeasure1: carregando,
    strMeasure2: carregando,
    strMeasure3: carregando,
    strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08' });
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const num = 6;
  const history = useHistory();
  const location = history.location.pathname;
  const id = location.split('/')[2];

  const fetchId = async () => {
    if (value === 'meals') {
      const food = await foodID(id);
      setReceitas(food[0]);
      const getD = await getDrink();
      setRecomendation(getD);
      console.log(recomendation);
    } if (value === 'drinks') {
      const drinks = await drinkID(id);
      setReceitas(drinks[0]);
      const getM = await getMeal();
      setRecomendation(getM);
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  const listIng = () => {
    const recipesIngr = Object.keys(receitas).filter((e) => receitas[e] !== null)
      .filter((item) => receitas[item] !== '').filter((i) => i.includes('strIngredient'));
    return recipesIngr;
  };

  const listMeasure = () => {
    const recipesMs = Object.keys(receitas).filter((e) => receitas[e] !== null)
      .filter((item) => receitas[item] !== '').filter((i) => i.includes('strMeasure'));
    return recipesMs;
  };

  const ingList = (
    <ul>
      {listIng().map((item, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`${receitas[listMeasure()[index]]}: ${receitas[item]}`}

        </li>
      ))}
    </ul>
  );

  const listRecpDt = (
    <div key={ receitas.idMeal || receitas.idDrink }>
      <img
        data-testid="recipe-photo"
        src={ receitas.strMealThumb || receitas.strDrinkThumb }
        alt={ receitas.strMeal || receitas.strDrink }
      />
      <h1 data-testid="recipe-title">{receitas.strMeal || receitas.strDrink}</h1>
      <h4 data-testid="recipe-category">
        { receitas.strAlcoholic || receitas.strCategory}
      </h4>
      <div>
        {ingList}
      </div>
      <h4
        data-testid="instructions"
      >
        {receitas.strInstructions}
      </h4>
      {receitas.strYoutube && (
        <iframe
          data-testid="video"
          title={ receitas.strMeal }
          width="420"
          height="315"
          src={ `https://www.youtube.com/embed/${receitas.strYoutube.split('=')[1]}` }
        />
      )}
    </div>
  );

  return (
    <>
      <div>{ listRecpDt }</div>
      <div className="rec">
        {recomendation ? recomendation.slice(0, num)
          .map((item, index) => ((item.strMeal === undefined) ? (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>
              <h1 data-testid={ `${index}-recommendation-title` }>{item.strDrink}</h1>
              <img
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                style={ { maxWidth: '180px' } }
              />
            </div>)
            : (
              <div key={ index } data-testid={ `${index}-recommendation-card` }>
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
      <ButtonFavorite receitas={ receitas } />
    </>
  );
}

RecipeDetails.propTypes = {
  value: PropTypes.string.isRequired,
};
