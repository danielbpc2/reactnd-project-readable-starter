import React, { Component } from 'react'

class Comment extends Component {
  render(){
    const {comment} = this.props
    return(
      <div className="comment">
        <div className='comment-upvote'>
          <div className="post-arrow"></div>
          <div className='comment-count'>{comment.voteScore}</div>
          <div className="post-arrow-down"></div>
        </div>
        <div className='comment-body'>
          <p>{comment.author}</p>
          <p>{comment.body}</p>
        </div>
        <ul className="list-inline">
          <li><span>button</span></li>
        </ul>
      </div>
    )
  }
}

export default Comment
