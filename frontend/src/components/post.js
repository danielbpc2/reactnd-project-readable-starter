import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleVote, handleDeletePost, handleEditPost } from '../actions/posts'
import { connect } from 'react-redux'

class Post extends Component {
  state = {
    isEditing: false,
    title: '',
    body: ''
  }

  handleVotes(postId, option){
    const {dispatch} = this.props
    dispatch(handleVote(postId, option))
  }

  handleDelete(id, e){
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleDeletePost(id))
  }

  handleFormChange(event, input) {
    this.setState( {[input]: event.target.value} )
  }

  submitEdit(e, id) {
    e.preventDefault()
    const {dispatch} = this.props
    const {title, body } = this.state
    this.setState({isEditing: false})
    dispatch(handleEditPost(id, {title, body}))
  }

  enableEdit = () => {
    const {post} = this.props
    this.setState({isEditing: true, title: post.title, body: post.body})
  }

  render(){
    const {post} = this.props
    return(
      this.state.isEditing ?
        <div className='post'>
           <form onSubmit={(e) => this.submitEdit(e, post.id)}>
            <div className='form-group'>
              <input className="form-control" type='text' onChange={e => this.handleFormChange(e,'title')} value={ this.state.title }/>
            </div>
            <div className='form-group'>
              <textarea className="form-control" onChange={e => this.handleFormChange(e,'body')} value={ this.state.body }/>
            </div>
            <button type='submit' className={'btn btn-success'}>Submit</button>
          </form>
        </div>
      :
        <div className="post">
          <div className='post-upvote'>
            <div className="post-arrow" onClick={(e) => this.handleVotes(post.id, 'upVote')}></div>
            <div className='post-count'>{post.voteScore}</div>
            <div className="post-arrow-down" onClick={(e) => this.handleVotes(post.id, 'downVote')}></div>
          </div>
          <div className='post-body'>
            <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            <p>{post.author}</p>
            <p>{post.commentCount} Comments.</p>
          </div>
          <ul className="list-inline post-controls">
            <li><span onClick={(e) => this.enableEdit()}>Edit</span></li>
            <li><span onClick={(e) => this.handleDelete(post.id, e)}>Delete</span></li>
          </ul>
        </div>
    )
  }
}

export default connect()(Post)



