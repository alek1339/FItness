import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';
import categoriesReducer from './categoriesReducer.js'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    categories: categoriesReducer
})
