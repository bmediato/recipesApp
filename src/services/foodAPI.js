export const getFoodIngredient = async (ingredient) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const requestJson = await request.json();
  return requestJson.results;
};

export const getFoodName = async (name) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const requestJson = await request.json();
  return requestJson.results;
};

export const getFoodFirstLetter = async (firstLetter) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const requestJson = await request.json();
  return requestJson.results;
};
