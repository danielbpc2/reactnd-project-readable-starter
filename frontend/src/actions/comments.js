import { saveComment, deleteComment, editComment, voteComment } from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const SET_COMMENT = 'SET_COMMENT'

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const setComment = (comments) => {
  return {
    type: SET_COMMENT,
    comments
  }
}

export const editCommentAction = (id, change) => {
  return {
    type: EDIT_COMMENT,
    id,
    change,
  }
}

export const deleteCommentAction = (id) => {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export const voteCommentAction = (id, option) => {
  return {
    type: VOTE_COMMENT,
    id,
    option
  }
}

export function handleAddComment (commentInfo) {
  return (dispatch) => {
    return saveComment(commentInfo)
    .then( ( comment ) => dispatch(addComment( comment ) ) )
    }
  }

export function handleVoteComment (commentId, option) {
  return dispatch => {
    dispatch(voteCommentAction(commentId, option))
    return voteComment(commentId, option)
  }
}

export function handleDeleteComment (id) {
  return dispatch => {
    return deleteComment(id)
    .then(dispatch(deleteCommentAction(id)))
  }
}

export function handleEditComment (id, change) {
  return dispatch => {
    return editComment(id, change)
    .then(dispatch(editCommentAction(id,change)))
  }
}
