export const SAVE_RECIPES = 'SAVE_RECIPE';
export const SAVE_PAGE = 'SAVE_PAGE';
export const SAVE_ID = 'SAVE_ID';

export const savePage = (payload) => ({
  type: SAVE_PAGE,
  payload,
});

export const saveRecipes = (payload) => ({
  type: SAVE_RECIPES,
  payload,
});

export const saveId = (payload) => ({
  type: SAVE_ID,
  payload,
});

// Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert
