import React, { Fragment, Component } from 'react'
import PostList from './postList'
import NavBar from './navBar'
import { connect } from 'react-redux'

class PostPage extends Component {
  render(){
    const { posts } = this.props
    return(
      <Fragment>
        <NavBar/>
        <div className="container">
          <PostList posts={posts}/>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({ posts, categories }){
  return {
    posts: Object.keys(posts).map(index => posts[index])
      .filter(post => post.deleted === false)
      .sort( ( x, y ) => ( y.timestamp - x.timestamp ) ),
  }
}

export default connect(mapStateToProps)(PostPage)
