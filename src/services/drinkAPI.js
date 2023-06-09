export const getDrinkIngredient = async (ingredient) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = await request.json();
  const recipes = response.drinks;
  if (!recipes) return [];
  return recipes;
};

export const getDrinkName = async (name) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await request.json();
  const recipes = response.drinks;
  if (!recipes) return [];
  return recipes;
};

export const getDrinkFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await request.json();
  return response.drinks;
};

export const getDrinksCategories = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await request.json();
  const categories = response.drinks;
  if (!categories) return [];
  return categories;
};

export const getDrink = async () => {
  const url = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await url.json();
  return response.drinks;
};

export const drinkID = async (id) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await request.json();
  return response.drinks;
};

export const searchCategoriesDrink = async (filter) => {
  const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`);
  const response = await url.json();
  return response.drinks;
};
