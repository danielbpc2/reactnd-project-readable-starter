import React, { Component } from 'react'
import Comment from './comment'

class CommentList extends Component {
  render(){
    return (
      <div className="container">
        <ul className="list-unstyled comment-list">
          {this.props.comments.length === 0
            ? <p>No one commented here yet, be the first!</p>
            : <p>Comments:</p>}
          {this.props.comments.map(comment =>
            <li key={comment.id}>
              <Comment deleteComment={this.props.deleteComment} comment={comment}/>
            </li>)}
        </ul>
      </div>
    )
  }
}

export default CommentList
