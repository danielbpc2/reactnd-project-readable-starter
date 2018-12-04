import { receivePosts } from './posts'
import { receiveCategories } from './categories'
import { getPosts, getCategories } from '../utils/api'

export const handleInitialData = () => {
  return (dispatch) => {
    return(
      getPosts().then((data) => (
        dispatch(receivePosts(data))
        ))
      getCategories().then((data) => (
        dispatch(receiveCategories(data))
        ))
    )
  }
}
