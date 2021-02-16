import { FETCH_CATEGORIES } from '../actions/types'

const initialState = [{ text: '', route: '', articles: []}]

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload
    default:
      return state
  }
}