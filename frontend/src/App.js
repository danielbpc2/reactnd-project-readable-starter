import React, {Fragment, Component } from 'react';
import './App.css';
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import PostsPage from './components/postsPage'
import CategoryPage from './components/categoryPage'
import NewPostPage from './components/newPostPage'


class App extends Component {
  componentDidMount (){
  const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route exact path='/' component={PostsPage}/>
          <Route path='/:category/posts' component={CategoryPage}/>
          <Route path='/posts/new' component={NewPostPage}/>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
