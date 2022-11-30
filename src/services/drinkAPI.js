export const getDrinkIngredient = async (ingredient) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`);
  const requestJson = await request.json();
  return requestJson.results;
};

export const getDrinkName = async (name) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const requestJson = await request.json();
  return requestJson.results;
};

export const getDrinkFirstLetter = async (firstLetter) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const requestJson = await request.json();
  return requestJson.results;
};
