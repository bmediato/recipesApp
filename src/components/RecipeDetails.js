import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { foodID } from '../services/foodAPI';
import { drinkID } from '../services/drinkAPI';
// import ButtonStartRecipe from './ButtonStartRecipe';
import { saveId } from '../redux/actions';
import './css/buttonStart.css';

export default function RecipeDetails({ value }) {
  const [receitas, setReceitas] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location.pathname;
  const id = location.split('/')[2];
  const embedId = strYoutube.split('=')[1];

  const fetchId = async () => {
    if (value === 'meals') {
      const food = await foodID(id);
      setReceitas(food.meals[0]);
    } if (value === 'drinks') {
      const drinks = await drinkID(id);
      setReceitas(drinks.drinks[0]);
    }
  };

  useEffect(() => {
    fetchId();
    dispatch(saveId(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {`${receitas[listMeasure()[i]]}: ${receitas[item]}`}

        </li>
      ))}
    </ul>
  );

  const listRecpDt = (
    <div>
      {receitas.map((i) => (
        <div key={ i.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ i.strMealThumb }
            alt={ i.strMeal }
          />
          <h1 data-testid="recipe-title">{i.strMeal}</h1>
          <h4 data-testid="recipe-category">{i.strCategory}</h4>
          {ingList}
          <h4
            data-testid="instructions"
          >
            {i.strInstructions}
          </h4>
          <iframe
            data-testid="video"
            title={ i.strMeal }
            width="420"
            height="315"
            src={ `https://www.youtube.com/embed/${embedId}` }
          />
        </div>
      ))}
    </div>
  );

  const listDrinkDt = (
    <div>
      {receitas.map((i) => (
        <div key={ i.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ i.strDrinkThumb }
            alt={ i.strDrink }
          />
          <h1 data-testid="recipe-title">{i.strDrink}</h1>
          <h4 data-testid="recipe-category">{i.strAlcoholic}</h4>
          {ingList}
          <h4 data-testid="instructions">{i.strInstructions}</h4>
        </div>
      ))}
    </div>
  );

  if (value === 'meals') {
    return listRecpDt;
  }
  return listDrinkDt;
}

RecipeDetails.propTypes = {}.isRequired;
