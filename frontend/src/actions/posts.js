import { savePost, votePost, deletePost, editPost } from '../utils/api'
import uuidv4 from 'uuid'
// action types
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

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

export const votePostAction = (id, option) => {
  return {
    type: VOTE_POST,
    id,
    option
  }
}

export const deletePostAction = (id) => {
  return {
    type: DELETE_POST,
    id
  }
}

export const editPostAction = (id, change) => {
  return {
    type: EDIT_POST,
    id,
    change
  }
}

export function handleAddPost (postInfo) {
  return (dispatch) => {
    const post = Object.assign({id: uuidv4(), timestamp: Date.now()}, postInfo)
    return savePost(post)
    .then( ( post ) => dispatch(addPost( post ) ) )
    }
  }

export function handleVote (postId, option) {
  return dispatch => {
    dispatch(votePostAction(postId, option))
    return votePost(postId, option)
  }
}

export function handleDeletePost (id) {
  return dispatch => {
    return deletePost(id)
    .then(dispatch(deletePostAction(id)))
  }
}

export function handleEditPost (id, change) {
  return dispatch => {
    return editPost(id, change)
    .then(dispatch(editPostAction(id,change)))
  }
}
