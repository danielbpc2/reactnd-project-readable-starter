import { receivePosts, setPost } from './posts'
import { receiveCategories} from './categories'
import { setComment } from './comments'
import { getPost, getPostComments, getInitialData } from '../utils/api'

export const LOADING_BEGIN = 'LOADING_BEGIN'
export const LOADING_END = 'LOADING_END'
// export const handleInitialData = () => {
//   return (dispatch) => {
//     return(
//       getAllPosts().then((data) => (
//         dispatch(receivePosts(data))
//       )),
//       getCategories().then((data) => (
//         dispatch(receiveCategories(data.categories))
//       )),
//       getAllPostComments().then(data => (
//         dispatch(receiveComments(data))
//       ))
//     )
//   }
// }

export const loadBegin = () => {
  return {
    type: LOADING_BEGIN,
    loading: true
  }
}
export const loadEnd = () => {
  return {
    type: LOADING_END,
    loading: false
  }
}

export const handleSetPost = (postId) => {
  return (dispatch) => {
    getPost(postId).then(post => dispatch(setPost(post)))
  }
}

export const handleSetComments = (postId) => {
  return (dispatch) => {
    getPostComments(postId).then(comments => dispatch(setComment(comments)))
  }
}

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(loadBegin())
    return(
      getInitialData().then( ({posts, categories, comments }) => {
        dispatch(receivePosts(posts))
        dispatch(receiveCategories(categories))
        dispatch(loadEnd())
      })
    )
  }
}
