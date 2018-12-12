import React, { Component } from 'react'
import { voteComment, editComment } from '../utils/api'

class Comment extends Component {
  state ={
    voteScore: this.props.comment.voteScore,
    isEditing: false,
    body: this.props.comment.body
  }

  handleVotes(commentId, option){
    voteComment(commentId, option).catch((e) => {
      alert('there was an error voting this comment, try again.')
      option === 'upVote' ? this.setState((prevState) => ({voteScore: prevState.voteScore -= 1}))
      : this.setState((prevState) => ({voteScore: prevState.voteScore += 1}))
    })

    option === 'upVote' ? this.setState((prevState) => ({voteScore: prevState.voteScore += 1}))
    : this.setState((prevState) => ({voteScore: prevState.voteScore -= 1}))
  }

  onDelete(id, e) {
    e.preventDefault()
    const { handleDeleteComment } = this.props
    handleDeleteComment(id)
  }

  enableEdit = () => {
    this.setState({isEditing: true})
  }

  handleFormChange(event, input) {
    this.setState( {[input]: event.target.value} )
  }

  submitEdit(e, id) {
    e.preventDefault()
    const { body } = this.state
    editComment(id, { body: body }).then(this.setState({isEditing: false }))
  }

  render(){
    const { comment } = this.props
    const { voteScore, body } = this.state

    return(
      this.state.isEditing ?
      <div className='text-center'>
         <form onSubmit={(e) => this.submitEdit(e, comment.id)}>
          <div className='form-group'>
            <textarea className="form-control" onChange={e => this.handleFormChange(e,'body')} value={ body }/>
          </div>
         {body !== '' ?
          <button type='submit' className={'btn btn-success'}>Submit</button>
        : null
        }
        </form>
      </div>
      :
      <div className="comment">
        <div className='comment-upvote'>
          <div className="post-arrow" onClick={(e) => this.handleVotes(comment.id, 'upVote')}></div>
          <div className='comment-count'>{ voteScore }</div>
          <div className="post-arrow-down" onClick={(e) => this.handleVotes(comment.id, 'downVote')}></div>
        </div>
        <div className='comment-body'>
          <p>{comment.author}</p>
          <p>{body}</p>
        </div>
        <ul className="list-inline">
          <li><span onClick={(e) =>this.enableEdit(e)}>Edit</span></li>
          <li><span onClick={(e) => {this.onDelete(comment.id, e)}}>Delete</span></li>
        </ul>
      </div>
    )
  }
}

export default Comment
