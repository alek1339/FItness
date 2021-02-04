import { GET_ERRORS } from './types';
import axios from 'axios';

export const addPage = (pageData) => dispatch => {
    axios
      .post('/pages/add', pageData)
      .then(res => alert('Page was added successfully!'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
