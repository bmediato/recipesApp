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

export const getMeal = async () => {
  const url = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await url.json();
  return response.meals;
};

export const getMealsCategories = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await request.json();
  const categories = response.meals;
  if (!categories) return [];
  return categories;
};

export const foodID = async (id) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await request.json();
  return response;
};

export const searchCategoriesMeals = async (filter) => {
  const url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`);
  const response = await url.json();
  return response.meals;
};
