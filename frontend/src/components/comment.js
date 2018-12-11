import React, { Component } from 'react'
import { voteComment, deleteComment } from '../utils/api'

class Comment extends Component {
  state ={
    voteScore: this.props.comment.voteScore
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

  render(){
    const { comment, handleDeleteComment } = this.props
    const { voteScore } = this.state

    return(
      <div className="comment">
        <div className='comment-upvote'>
          <div className="post-arrow" onClick={(e) => this.handleVotes(comment.id, 'upVote')}></div>
          <div className='comment-count'>{ voteScore }</div>
          <div className="post-arrow-down" onClick={(e) => this.handleVotes(comment.id, 'downVote')}></div>
        </div>
        <div className='comment-body'>
          <p>{comment.author}</p>
          <p>{comment.body}</p>
        </div>
        <ul className="list-inline">
          <li><span>button</span></li>
          <li><span onClick={(e) => {this.onDelete(comment.id, e)}}>Delete</span></li>
        </ul>
      </div>
    )
  }
}

export default Comment
