import { combineReducers } from 'redux';
import searchRecipes from './searchRecipes';

const rootReducer = combineReducers({ searchRecipes });

export default rootReducer;
