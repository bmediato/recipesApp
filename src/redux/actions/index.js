export const SHOW_RECIPES = 'SHOW_RECIPES';
export const SAVE_PAGE = 'SAVE_PAGE';

export const savePage = (payload) => ({
  type: SAVE_PAGE,
  payload,
});

export const saveShowRecipes = (payload) => ({
  type: SHOW_RECIPES,
  payload,
});

// Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert
