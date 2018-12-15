import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleEditComment, handleVoteComment } from '../actions/comments'

class Comment extends Component {
  state ={
    voteScore: this.props.comment.voteScore,
    isEditing: false,
    body: this.props.comment.body
  }

  handleVotes(commentId, option){
    const { dispatch } = this.props
    dispatch(handleVoteComment(commentId, option))
    option === 'upVote' ? this.setState((prevState) => ({voteScore: prevState.voteScore += 1}))
    : this.setState((prevState) => ({voteScore: prevState.voteScore -= 1}))
  }

  onDelete(id, e) {
    e.preventDefault()
    const { deleteComment } = this.props
    deleteComment(id)
  }

  enableEdit = () => {
    this.setState({isEditing: true})
  }

  handleFormChange(event, input) {
    this.setState( {[input]: event.target.value} )
  }

  submitEdit(e, id) {
    e.preventDefault()
    const { dispatch } = this.props
    const { body } = this.state
    dispatch(handleEditComment(id, { body: body }))
    this.setState({isEditing: false })
  }

  render(){
    const { comment } = this.props
    const { voteScore, body } = this.state

    return(
      this.state.isEditing ?
      <div className='container'>
        <form className='comment-form comment-text' onSubmit={(e) => this.submitEdit(e, comment.id)}>
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
          <div className="comment-author">
            <p>{comment.author}:</p>
          </div>
          <div className="comment-text">
            <p>{body}</p>
          </div>
          <ul className="list-inline comment-control">
            <li><span onClick={(e) =>this.enableEdit(e)}>Edit</span></li>
            <li><span onClick={(e) => {this.onDelete(comment.id, e)}}>Delete</span></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect()(Comment)
