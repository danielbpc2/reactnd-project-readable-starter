import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleVote, handleDeletePost } from '../actions/posts'
import { connect } from 'react-redux'

class Post extends Component {
  handleVotes(postId, option){
    const {dispatch} = this.props
    dispatch(handleVote(postId, option))
  }

  handleDelete(id, e){
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleDeletePost(id))
  }

  render(){
    const {post} = this.props
    return(
      <div className="post">
        <div className='post-upvote'>
          <div className="post-arrow" onClick={(e) => this.handleVotes(post.id, 'upVote')}></div>
          <div className='post-count'>{post.voteScore}</div>
          <div className="post-arrow-down" onClick={(e) => this.handleVotes(post.id, 'downVote')}></div>
        </div>
        <div className='post-body'>
          <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
          <p>{post.author}</p>
        </div>
        <ul className="list-inline post-controls">
          <li><span>Edit</span></li>
          <li><span onClick={(e) => this.handleDelete(post.id, e)}>Delete</span></li>
        </ul>
      </div>
    )
  }
}

export default connect()(Post)
