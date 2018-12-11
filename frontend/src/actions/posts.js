import {savePost} from '../utils/api'
import { generateId } from '../utils/helpers'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

export function handleAddPost (postInfo) {
  return (dispatch) => {
    const post = Object.assign({id: generateId(), timestamp: Date.now()}, postInfo)
    return savePost(post)
    .then( ( post ) => dispatch(addPost( post ) ) )
    }
  }

