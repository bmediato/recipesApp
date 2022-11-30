import { SHOW_RECIPES } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  searchInput: '',
  ingredient: '',
  name: '',
  firstLetter: '',
};

function searchRecipes(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SHOW_RECIPES:
    return {
      ...state,
      recipes: action.payload,
    };
  default:
    return state;
  }
}

export default searchRecipes;
