import { RECEIVE_POSTS, ADD_POST, VOTE_POST, DELETE_POST, EDIT_POST } from '../actions/posts'

const posts = (state = [], action ) => {
  switch(action.type){
    case RECEIVE_POSTS :
    return {
      ...state,
      ...action.posts
    }
    case ADD_POST :
    return  {
      ...state,
      [action.post.id]: action.post
    }
    case VOTE_POST :
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        voteScore: action.option === 'upVote'
        ? state[action.id].voteScore += 1
        : state[action.id].voteScore -= 1
      }
    }
    case DELETE_POST:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        deleted: true
      }
    }
    case EDIT_POST :
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        ...action.change
      }
    }
    default :
    return state
  }
}

export default posts
