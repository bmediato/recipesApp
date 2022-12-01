export const getDrinkIngredient = async (ingredient) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = await request.json();
  const recipes = response.ingredients;
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

export const drinkID = async (id) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await request.json();
  return response;
};
