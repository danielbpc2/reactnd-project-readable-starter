import React, {Fragment, Component } from 'react';
import './App.css';
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
// My pages components
import PostsPage from './components/postsPage'
import CategoryPage from './components/categoryPage'
import NewPostPage from './components/newPostPage'
import PostDetailed from './components/postDetailed'

class App extends Component {
  componentDidMount (){
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          {
            this.props.post
            ? null
            :
            <Fragment>
              <Route exact path='/' component={PostsPage}/>
              <Route path='/:category/posts' component={CategoryPage}/>
              <Route path='/posts/new' component={NewPostPage}/>
              <Route strict path='/:category/:id' component={PostDetailed}/>
            </Fragment>
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
