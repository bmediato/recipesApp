import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { foodID } from '../services/foodAPI';
import { drinkID } from '../services/drinkAPI';
import ButtonStartRecipe from './Buttons/ButtonStartRecipe';
import ButtonFavorite from './Buttons/ButtonFavorite';
import './css/buttonStart.css';

import ButtonShare from './Buttons/ButtonShare';

export default function RecipeDetails({ value }) {
  const carregando = 'carregando...';

  const [receitas, setReceitas] = useState({ strMeasure1: carregando,
    strMeasure2: carregando,
    strMeasure3: carregando,
    strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08' });

  const history = useHistory();
  const location = history.location.pathname;
  const id = location.split('/')[2];

  const fetchId = async () => {
    if (value === 'meals') {
      const food = await foodID(id);
      setReceitas(food[0]);
    } if (value === 'drinks') {
      const drinks = await drinkID(id);
      setReceitas(drinks[0]);
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

      <ButtonStartRecipe id={ id } history={ history } />
      <ButtonShare />
      <ButtonFavorite receitas={ receitas } />
    </>
  );
}

RecipeDetails.propTypes = {
  value: PropTypes.string.isRequired,
};
