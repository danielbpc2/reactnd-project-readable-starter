import React, { Component } from 'react'

class Post extends Component {
  render(){
    const {post} = this.props
    return(
      <div className="post">
        <div className='post-upvote'>
          <div className="post-arrow"></div>
          <div className='post-count'>{post.voteScore}</div>
          <div className="post-arrow"></div>
        </div>
        <div className='post-body'>
          <h3>{post.title}</h3>
          <p>{post.author}</p>
        </div>
        <ul className="list-inline post-controls hidden-sm hidden-xs">
          <li><span>button</span></li>
          <li><span>button</span></li>
          <li><span>button</span></li>
        </ul>
      </div>
    )
  }
}

export default Post
