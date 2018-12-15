import { LOADING_BEGIN } from '../actions/shared'
import { LOADING_END } from '../actions/shared'

const loading = (state = null, action ) => {
  switch(action.type){
    case LOADING_BEGIN :
    return action.loading
    case LOADING_END:
    return action.loading
    default :
    return state
  }
}

export default loading
