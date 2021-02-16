import { FETCH_ARTICLES } from '../actions/types'

const initialState = [{ htmlData: ''}]

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return action.payload
    default:
      return state
  }
}