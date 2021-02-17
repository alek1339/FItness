import { GET_ERRORS, FETCH_ARTICLES } from './types';
import axios from 'axios';
import {updateCategory} from './categoryActions.js'

export const addArticle = (articleData) => dispatch => {
    axios
      .post('/articles/add', articleData)
      .then(res => {
        let categoryData = {
          articleId:  res.data.id,
          id: articleData.categoryId
        };
        alert('category was updated successfully!')
        window.location.reload();
        
        axios
        .post('/categories/update', categoryData)
        .then(res => {
         
        })
        .catch(err => console.log(err))
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }

  export const fetchArticles = () => dispatch => {
    axios.get('/articles')
      .then(res => dispatch({
        type: FETCH_ARTICLES,
        payload: res.data
      }))
      .catch(err => console.log(err))
  }