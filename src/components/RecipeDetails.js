import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { foodID } from '../services/foodAPI';
import { drinkID } from '../services/drinkAPI';
import ButtonStartRecipe from './ButtonStartRecipe';
import { saveId } from '../redux/actions';
import './css/buttonStart.css';

export default function RecipeDetails({ value }) {
  const dispatch = useDispatch();
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
    dispatch(saveId(id));
  }, []);

  return (
    <>
      <div>RecipeDetails</div>
      <ButtonStartRecipe />
    </>
  );
}

RecipeDetails.propTypes = {}.isRequired;
