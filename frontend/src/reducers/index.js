import { combineReducer } from 'redux'
import posts from './posts'
import categories from './categories'

export default combineReducer({
  posts,
  categories
})
