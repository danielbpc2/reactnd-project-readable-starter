import React, { Component } from 'react'
import Post from './post'

class PostList extends Component {
  sortByTop(e, props) {
    e.preventDefault()
    props.sort( (x,y) => (y.voteScore - x.voteScore))
    this.forceUpdate()
  }
  sortByNew(e, props) {
    e.preventDefault()
    props.sort( (x,y) => (y.timestamp - x.timestamp))
    this.forceUpdate()
  }

  render(){
    const { posts } = this.props
    return (
      <div className="text-center">
        <div className="tabs">
          <span className="tab active" onClick={(e) => {this.sortByNew(e, posts)}}>
            <h3>New</h3>
          </span>
          <span className="tab" onClick={(e) => {this.sortByTop(e, posts)}}>
            <h3>Top</h3>
          </span>
        </div>
        <ul className="list-unstyled">
          {posts.map(post =>
            <li key={post.id}>
              <Post post={post}/>
            </li>)}
        </ul>
      </div>
    )
  }
}

export default PostList
