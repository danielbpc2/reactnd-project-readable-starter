import { RECEIVE_COMMENTS, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, VOTE_COMMENT } from '../actions/comments'

const comments = (state = [], action ) => {
  switch(action.type){
    case RECEIVE_COMMENTS :
    return action.comments
    case ADD_COMMENT :
    return [...state, action.comment]
    case DELETE_COMMENT :
    return state.filter(comment => comment.id !== action.id)
    case EDIT_COMMENT :
      const newstate = state.map( (comment) => {
      if (comment.id === action.id){
        return {...comment, ...action.change }
      }
        else { return comment}
        }
      )
      return newstate
    case VOTE_COMMENT :
      const votedState = state.map( (comment) => {
      if (comment.id === action.id){
        return {...comment, voteScore: action.option === 'upVote'
        ? comment.voteScore += 1
        : comment.voteScore -= 1 }
      }
        else { return comment}
        }
      )
      return votedState
    default :
    return state
  }
}

export default comments
