import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPostComments , saveComment } from '../utils/api'
import { generateId } from '../utils/helpers'
// Components
import NavBar from './navBar'
import CommentList from './commentList'
import NewComment from './newComment'

class PostDetailed extends Component {
  state = {
    comments: []
  }

  componentDidMount(){
    getPostComments(this.props.postId).then(data => this.setState({comments: data}))
  }

  onSubmit = (commentBody, commentAuthor, postId) => {
    const newComment = { id: generateId(), timestamp: Date.now(), body: commentBody, author: commentAuthor, parentId: postId }
    saveComment(newComment)
    .then(data => this.setState((prevState)=> ( {comments: [...prevState.comments,data]}) ))
  }

  render(){
    const {post} = this.props
    return(
      post
        ?
      <Fragment>
        <NavBar categoryName={post.category}/>
        <div className='container'>
          <h1>{post.title}</h1>
          <p>{post.author} - {new Date(post.timestamp).toString()}</p>
          <p>{post.voteScore}</p>
          <p>{post.body}</p>
        </div>
        <NewComment onSubmit={this.onSubmit} postId={post.id}/>
        <CommentList comments={this.state.comments}/>
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
