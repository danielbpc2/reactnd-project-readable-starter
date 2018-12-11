import { receivePosts } from './posts'
import { receiveCategories } from './categories'
import { getAllPosts, getCategories } from '../utils/api'

export const handleInitialData = () => {
  return (dispatch) => {
    return(
      getAllPosts().then((data) => (
        dispatch(receivePosts(data))
      )),
      getCategories().then((data) => (
        dispatch(receiveCategories(data.categories))
      ))
    )
  }
}
