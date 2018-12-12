import React, {Fragment, Component } from 'react';
import './App.css';
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// My pages components
import PostsPage from './components/postsPage'
import CategoryPage from './components/categoryPage'
import NewPostPage from './components/newPostPage'
import PostDetailed from './components/postDetailed'

class App extends Component {
  state = {
    isLoading: true
  }

  componentDidMount (){
    const {dispatch} = this.props
    dispatch(handleInitialData()).then(this.setState({isLoading: false }))
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          {
            this.state.isLoading
            ? console.log('Loading Done')
            :
            <Fragment>
              <Switch>
                <Route exact path='/' component={PostsPage}/>
                <Route exact strict path='/posts/new' component={NewPostPage}/>
                <Route exact strict path='/:category' component={CategoryPage}/>
                <Route path='/:category/:id' component={PostDetailed}/>
              </Switch>
            </Fragment>
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
