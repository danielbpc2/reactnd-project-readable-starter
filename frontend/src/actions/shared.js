import { receivePosts } from './posts'
import { receiveCategories } from './categories'
import { receiveComments } from './comments'
import { getAllPosts, getCategories, getAllPostComments } from '../utils/api'

export const handleInitialData = () => {
  return (dispatch) => {
    return(
      getAllPosts().then((data) => (
        dispatch(receivePosts(data))
      )),
      getCategories().then((data) => (
        dispatch(receiveCategories(data.categories))
      )),
      getAllPostComments().then(data => (
        dispatch(receiveComments(data))
      ))
    )
  }
}
