import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { handleDeletePost, handleVote, handleEditPost } from '../actions/posts'
import { handleAddComment, handleDeleteComment } from '../actions/comments'
import { handleSetPost, handleSetComments } from '../actions/shared'
import uuidv4 from 'uuid'
// Components
import NavBar from './navBar'
import CommentList from './commentList'
import NewComment from './newComment'

class PostDetailed extends Component {
  state = {
    isEditingPost: false,
    title: '',
    body: '',
    redirect: false
  }

  componentDidMount(){
    this.props.post === undefined && this.props.dispatch(handleSetPost(this.props.match.params.id))
    this.props.dispatch(handleSetComments(this.props.match.params.id))
  }

  handleFormChange(event, input) {
    this.setState( {[input]: event.target.value} )
  }

  onSubmit = (commentBody, commentAuthor, postId) => {
    const { dispatch, postComments } = this.props
    const newComment = { id: uuidv4(), timestamp: Date.now(), body: commentBody, author: commentAuthor, parentId: postId }
    dispatch(handleAddComment(newComment))
    dispatch(handleEditPost( postId, { commentCount: postComments.length + 1 } ))
  }

  handleDelete(id, e){
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleDeletePost(id))
    this.setState({redirect: true})
  }

  handleVotes(postId, option){
    const {dispatch} = this.props
    dispatch(handleVote(postId, option))
  }

  deleteComment = (id) => {
    const { dispatch, post, postComments } = this.props
    dispatch(handleDeleteComment(id))
    dispatch(handleEditPost( post.id, { commentCount: postComments.length - 1 } ))
  }

  enableEdit = () => {
    const {post} = this.props
    this.setState({isEditingPost: true, title: post.title, body: post.body})
  }

  submitEdit(e, id) {
    e.preventDefault()
    const {dispatch} = this.props
    const {title, body } = this.state
    this.setState({isEditingPost: false})
    dispatch(handleEditPost(id, {title, body}))
  }

  render(){
    const { post, postComments } = this.props
    const { isEditingPost, redirect } = this.state

    if (redirect === true) {
          return <Redirect to='/'/>
      }

    return(
      post !== undefined
        ?
          <Fragment>
            <NavBar categoryName={post.category}/>
            {
              isEditingPost === false
              ?
            <div className='container'>
              <div className='post-details-info'>
                <div className='post-details-top'>
                  <div className="post-upvote">
                    <div className="post-arrow" onClick={(e) => this.handleVotes(post.id, 'upVote')}></div>
                    <div className="post-count">{post.voteScore}</div>
                    <div className="post-arrow-down" onClick={(e) => this.handleVotes(post.id, 'downVote')}></div>
                  </div>
                  <div className='post-details-title'>
                    <h3>{post.title}</h3>
                    <p>{post.author} - {new Date(post.timestamp).toLocaleTimeString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC', timeZoneName: 'short' })}</p>
                  </div>
                </div>
                <div className='post-details-body'>
                  <p>{post.body}</p>
                </div>
                <div className='post-details-controls'>
                    <button className='btn btn-secondary' onClick={(e) => this.enableEdit()}>Edit</button>
                    <button className='btn btn-danger' onClick={(e) => this.handleDelete(post.id, e)}>Delete</button>
                </div>
                <p style={{marginBottom: '0px'}}>{postComments.length} Comments</p>
              </div>
            </div>
            :
              <div className='container'>
                <div className='post-details-info'>
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
              </div>
             }
            <NewComment onSubmit={this.onSubmit} postId={post.id}/>
            <CommentList deleteComment={this.deleteComment} comments={postComments}/>
          </Fragment>
        :
        <Fragment>
            <NavBar/>
            <div className="container text-center">
              <div className="post-details-info">
                <h1> 404: This post does not exist.</h1>
              </div>
            </div>
          </Fragment>
    )
  }
}

function mapStateToProps({posts, comments}, props ) {
  const { id } = props.match.params
  const post = posts[id]
  const postComments = comments

  return {
    post: post,
    postComments: postComments,
  }
}

export default withRouter(connect(mapStateToProps)(PostDetailed))
