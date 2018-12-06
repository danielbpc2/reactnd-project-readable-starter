import React, { Fragment, Component } from 'react'
import PostList from './postList'
import NavBar from './navBar'
import { connect } from 'react-redux'

class CategoryPage extends Component {
  render(){
    const { posts, categoryName } = this.props
    return(
      <Fragment>
        <NavBar categoryName={categoryName}/>
        <div className="container">
          <PostList posts={posts}/>
        </div>
      </Fragment>
      )
  }
}

function mapStateToProps({ posts, categories }, props){
  const { category } = props.match.params

  return {
    posts: Object.keys(posts).map(index => posts[index])
      .sort( ( x, y ) => ( y.timestamp - x.timestamp ) )
      .filter(post => post.category === category),
    categoryName: category,
  }
}

export default connect(mapStateToProps)(CategoryPage)
