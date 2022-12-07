import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { foodID, getMeal } from '../services/foodAPI';
import { drinkID, getDrink } from '../services/drinkAPI';
import ButtonStartRecipe from './ButtonStartRecipe';
import './css/buttonStart.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function RecipeDetails({ value }) {
  const carregando = 'carregando...';
  const [recomendation, setRecomendation] = useState([]);
  const [receitas, setReceitas] = useState({ strMeasure1: carregando,
    strMeasure2: carregando,
    strMeasure3: carregando,
    strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08' });
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const history = useHistory();
  const location = history.location.pathname;
  const id = location.split('/')[2];
  console.log(recomendation);

  const fetchId = async () => {
    if (value === 'meals') {
      const food = await foodID(id);
      setReceitas(food.meals[0]);
      const getD = await getDrink();
      setRecomendation(getD);
    } if (value === 'drinks') {
      const drinks = await drinkID(id);
      setReceitas(drinks.drinks[0]);
      const getM = await getMeal();
      setRecomendation(getM);
    }
  };

  const onClickShareButton = () => {
    const timerToDeletePhrase = 5000;
    copy(`http://localhost:3000${location}`);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), timerToDeletePhrase);
  };

  useEffect(() => {
    fetchId();
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

      <button
        data-testid="share-btn"
        type="button"
        onClick={ onClickShareButton }
      >
        <img
          src={ shareIcon }
          alt="ShareIcon"
        />
      </button>
      {isLinkCopied && (<p>Link copied!</p>)}
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
