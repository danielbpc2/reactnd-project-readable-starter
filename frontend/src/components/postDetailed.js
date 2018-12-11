import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPostComments , saveComment, deleteComment } from '../utils/api'
import { handleDeletePost, handleVote } from '../actions/posts'
import { generateId } from '../utils/helpers'
// Components
import NavBar from './navBar'
import CommentList from './commentList'
import NewComment from './newComment'

class PostDetailed extends Component {
  state = {
    comments: [],
    isEditing: false
  }

  componentDidMount(){
    getPostComments(this.props.postId).then(data => this.setState({comments: data}))
  }

  onSubmit = (commentBody, commentAuthor, postId) => {
    const newComment = { id: generateId(), timestamp: Date.now(), body: commentBody, author: commentAuthor, parentId: postId }
    saveComment(newComment)
    .then(data => this.setState((prevState)=> ( {comments: [...prevState.comments,data]}) ))
  }

  handleDelete(id, e){
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleDeletePost(id))
  }

  handleVotes(postId, option){
    const {dispatch} = this.props
    dispatch(handleVote(postId, option))
  }

  handleDeleteComment = (id) => {
    deleteComment(id)
    .then(this.setState( (prevState) => ( { comments: prevState.comments.filter(comment => comment.id !== id) } ) ) )
  }

  render(){
    const {post} = this.props
    return(
      post
        ?
        post.deleted
          ?
          <Fragment>
            <NavBar categoryName={post.category}/>
            <div className="container text-center">
              <h1> 404: This post was deleted</h1>
              <CommentList comments={this.state.comments}/>
            </div>
          </Fragment>
          :
          <Fragment>
            <NavBar categoryName={post.category}/>
            <div className='container'>
              <h1>{post.title}</h1>
              <p>{post.author} - {new Date(post.timestamp).toString()}</p>
              <div className="post-arrow" onClick={(e) => this.handleVotes(post.id, 'upVote')}></div>
              <p>{post.voteScore}</p>
              <div className="post-arrow-down" onClick={(e) => this.handleVotes(post.id, 'downVote')}></div>
              <p>{post.body}</p>
              <button onClick={(e) => this.handleDelete(post.id, e)}>Delete</button>
              <button>Edit</button>
            </div>
            <NewComment onSubmit={this.onSubmit} postId={post.id}/>
            <CommentList handleDeleteComment={this.handleDeleteComment} comments={this.state.comments}/>
          </Fragment>
        :
        null
    )
  }
}

function mapStateToProps({posts}, props ) {
  const { id } = props.match.params
  const post = posts[id]

  return {
    postId: id,
    post: post,
  }
}
export default withRouter(connect(mapStateToProps)(PostDetailed))
