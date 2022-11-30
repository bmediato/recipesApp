export const SHOW_RECIPES = 'SHOW_RECIPES';

export const saveShowRecipes = (payload) => ({
  type: SHOW_RECIPES,
  payload,
});

export function fetchRecipes(searchInput) {
  return async (dispatch) => {
    try {
      switch (value) {
      case ingredient:
        const dataFoodIngredient = await getFoodIngredient(searchInput);
        const datagetDrinkIngredient = await getDrinkIngredient(searchInput);
        dispatch(saveShowRecipes({}));
      case name:
        const dataGetFoodName = await getFoodName(searchInput);
        const datagetDrinkName = await getDrinkName(searchInput);
        dispatch(saveShowRecipes({}));
      case firstLetter:
        const datagetFoodFirstLetter = await getFoodFirstLetter(searchInput);
        const datagetDrinkFirstLetter = await getDrinkFirstLetter(searchInput);
        dispatch(saveShowRecipes({}));
      default:
        break;
      }
    } catch (e) {
      throw new Error(e);
    }
  };
}

// Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert
