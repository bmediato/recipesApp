export const getDrinkIngredient = async (ingredient) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const requestJson = await request.json();
  return requestJson.ingredients;
};

export const getDrinkName = async (name) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const requestJson = await request.json();
  return requestJson.drinks;
};

export const getDrinkFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    return global.alert('Your search must have only 1 (one) character');
  }

  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const requestJson = await request.json();
  return requestJson.drinks;
};
