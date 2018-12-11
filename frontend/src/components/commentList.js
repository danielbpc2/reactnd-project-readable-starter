import React, { Component } from 'react'
import Comment from './comment'

class CommentList extends Component {
  render(){
    return (
      <div className="text-center">
        <ul className="list-unstyled">
          {this.props.comments.map(comment =>
            <li key={comment.id}>
              <Comment comment={comment}/>
            </li>)}
        </ul>
      </div>
    )
  }
}

export default CommentList
