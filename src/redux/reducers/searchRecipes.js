import { SAVE_RECIPES, SAVE_PAGE, SAVE_ID } from '../actions';

const INITIAL_STATE = {
  page: '',
  recipes: [],
  searchInput: '',
};

function searchRecipes(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_RECIPES:
    return {
      ...state,
      recipes: action.payload,
    };
  case SAVE_PAGE:
    return {
      ...state,
      page: action.payload,
    };
  case SAVE_ID:
    return {
      ...state,
      id: action.payload,
    };
  default:
    return state;
  }
}

export default searchRecipes;
