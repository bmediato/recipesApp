export function fetchRecipes(searchInput){
  return async (dispatch) => {
      switch (value) {
    case ingredient:
      const dataFoodIngredient = await getFoodIngredient(searchInput);
      const datagetDrinkIngredient = await getDrinkIngredient(searchInput);
      return dataFoodIngredient;
    case name:
      const dataGetFoodName = await getFoodName(searchInput);
        const datagetDrinkName = await getDrinkName(searchInput);
      return dataGetFoodName;
    case firstLetter:
      const datagetFoodFirstLetter = await getFoodFirstLetter(searchInput);
        const datagetDrinkFirstLetter = await getDrinkFirstLetter(searchInput);
      return datagetFoodFirstLetter;
    default:
      break;
  }
}