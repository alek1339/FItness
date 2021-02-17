import { GET_ERRORS, FETCH_CATEGORIES } from './types';
import axios from 'axios';

export const addCategory = (categoryData) => dispatch => {
    axios
      .post('/categories/add', categoryData)
      .then(res => {
        alert('category was updated successfully!')
        window.location.reload();
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }

  export const fetchCategories = () => dispatch => {
    axios.get('/categories')
      .then(res => dispatch({
        type: FETCH_CATEGORIES,
        payload: res.data
      }))
      .catch(err => console.log(err))
  }

  export const updateCategory = (categoryData) => dispatch => {
    console.log('here')
    axios
        .post('/categories/update', categoryData)
        .then(res => alert('category was updated successfully!'))
        .catch(err => console.log(err))
  };

