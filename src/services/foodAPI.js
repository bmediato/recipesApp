export const getFoodIngredient = async (ingredient) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = await request.json();
  const recipes = response.meals;
  if (!recipes) return [];
  return recipes;
};

export const getFoodName = async (name) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await request.json();
  const recipes = response.meals;
  if (!recipes) return [];
  return recipes;
};

export const getFoodFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await request.json();
  return response.meals;
};

export const foodID = async (id) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await request.json();
  return response;
};
