import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Post extends Component {
  render(){
    const {post} = this.props
    return(
      <div className="post">
        <div className='post-upvote'>
          <div className="post-arrow"></div>
          <div className='post-count'>{post.voteScore}</div>
          <div className="post-arrow-down"></div>
        </div>
        <div className='post-body'>
          <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
          <p>{post.author}</p>
        </div>
        <ul className="list-inline post-controls">
          <li><span>button</span></li>
          <li><span>button</span></li>
          <li><span>button</span></li>
        </ul>
      </div>
    )
  }
}

export default Post
