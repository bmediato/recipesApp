import { SHOW_RECIPES } from '../actions';

const INITIAL_STATE = {
  page: '',
  recipes: [],
  searchInput: '',
};

function searchRecipes(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SHOW_RECIPES:
    return {
      ...state,
      recipes: action.payload,
    };
  case SAVE_PAGE:
    return {
      ...state,
      page: action.payload,
    };
  default:
    return state;
  }
}

export default searchRecipes;
