import React, { Component } from 'react'
import Post from './post'

class PostList extends Component {

  componentWillReceiveProps(props){
    const tabNew = document.getElementById('new')
    const tabTop = document.getElementById('top')
    if (tabNew.classList.value.includes('active')){
      props.posts.sort( (x,y) => (y.timestamp - x.timestamp))
    }
    if (tabTop.classList.value.includes('active')){
      props.posts.sort( (x,y) => (y.voteScore - x.voteScore))
    }
  }

  sortByTop(e, props) {
    e.preventDefault()
    const tabInactive = document.getElementById('top')
    const tabActive = document.getElementById('new')
    tabInactive.classList.add('active')
    tabActive.classList.remove('active')
    props.sort( (x,y) => (y.voteScore - x.voteScore))
    this.forceUpdate()
  }

  sortByNew(e, props) {
    e.preventDefault()
    const tabInactive = document.getElementById('new')
    const tabActive = document.getElementById('top')
    tabInactive.classList.add('active')
    tabActive.classList.remove('active')
    props.sort( (x,y) => (y.timestamp - x.timestamp))
    this.forceUpdate()
  }

  render(){
    const { posts } = this.props
    return (
      <div className="text-center">
        <div className="tabs">
          <span className="tab active" id="new" onClick={(e) => {this.sortByNew(e, posts)}}>
            <h3>New</h3>
          </span>
          <span className="tab" id="top" onClick={(e) => {this.sortByTop(e, posts)}}>
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
