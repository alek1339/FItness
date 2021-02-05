import { GET_ERRORS } from './types';
import axios from 'axios';

export const addArticle = (articleData) => dispatch => {
    axios
      .post('/articles/add', articleData)
      .then(res => alert('Article was added successfully!'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
