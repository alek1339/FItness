import { GET_ERRORS } from './types';
import axios from 'axios';

export const addCategory = (categoryData) => dispatch => {
    axios
      .post('/categories/add', categoryData)
      .then(res => alert('category was added successfully!'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
