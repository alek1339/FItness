
import { SET_CURRENT_USER, GET_ERRORS } from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/sethAuthToken'

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/users/register', userData)
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login User
export const loginUser = (userData) => dispatch => {
  axios.post('/users/login', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

  // Just for TEST
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} wich will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}