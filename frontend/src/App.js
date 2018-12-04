import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount (){
  const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  render() {
    const { posts, categories } = this.props
    return (
      <div className="App">
        Hello Udacity
        <h3>categories:</h3>
        {categories.map(category => <p key={category.name}>{category.name}</p>)}
        <h3>posts:</h3>
        {posts.map(post => <p key={post.id}>{post.title}</p>)}
      </div>
    );
  }
}

function mapStateToProps({ posts, categories }){
  return {
    posts: Object.keys(posts).map(index => posts[index])
      .sort( ( x, y ) => ( y.timestamp - x.timestamp ) ),
    categories: Object.keys(categories).map(index => categories[index])
  }
}

export default connect(mapStateToProps)(App);
