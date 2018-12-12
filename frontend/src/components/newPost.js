import React, { Component } from 'react'
import { connect } from 'react-redux'
import {handleAddPost} from '../actions/posts'
import { Redirect } from 'react-router-dom'

class NewPost extends Component {
  state = {
    body: '',
    title: '',
    author: '',
    category: '',
    redirect: false,
  }

  handleFormChange(event, input) {
    this.setState( {[input]: event.target.value} )
  }

  onSubmit(event){
    const {body, title, author, category} = this.state
    const {dispatch} = this.props

    event.preventDefault();
    dispatch(handleAddPost({title: title, body: body, author: author, category: category}))
    this.setState({ body: '', title: '', author: '', category: '', redirect: true })
  }

  render() {
    const {redirect, body, title, author, category} = this.state
    const { categories } = this.props

    if (redirect === true) {
      return <Redirect to='/'/>
    }

    return (
      <form className='post-details-info' onSubmit={e => this.onSubmit(e)}>
        <h3>Make a new Post</h3>
        <div className='form-group'>
          <label>Title:</label>
          <input placeholder="Post Title" className="form-control" type='text' onChange={e => this.handleFormChange(e,'title')} value={ this.state.title }/>
        </div>
        <div className='form-group'>
          <label>Author:</label>
          <input placeholder="Your Username" className="form-control" type='text' onChange={e => this.handleFormChange(e,'author')} value={ this.state.author }/>
        </div>
        <div className='form-group'>
          <label>Text:</label>
          <textarea placeholder="Write your post content here!" className="form-control" onChange={e => this.handleFormChange(e,'body')} value={this.state.body}/>
        </div>
        <div className='form-group'>
          <label>Category:</label>
          <select className="form-control" onChange={e => this.handleFormChange(e,'category')} value={this.state.category}>
            <option value=''>None</option>
            {categories.map(category => <option key={category.name}>{category.name}</option>)}
          </select>
        </div>
        {body !== '' && title !== '' && author !== '' && category !== '' ?
          <button type='submit' className={'btn btn-success'}>Submit</button>
          : null
        }
      </form>
    )
  }
}

function mapStateToProps({categories}, props){
  return{
    categories: Object.keys(categories).map(index => categories[index])
  }
}

export default connect(mapStateToProps)(NewPost);
