import React, { Component } from 'react'
// import { connect } from 'react-redux'

class NewPost extends Component {
  state = {
    body: '',
    title: '',
    author: '',
    category: '',
  }

  render() {
    return (
      <form className='container'>
        <div className='form-group'>
          <label>Title:</label>
          <input class="form-control" type='text' value={ this.state.title }/>
        </div>
        <div className='form-group'>
          <label>Author:</label>
          <input class="form-control" type='text' value={ this.state.author }/>
        </div>
        <div className='form-group'>
          <label>Text:</label>
          <textarea class="form-control" value={this.state.body}/>
        </div>
        <div className='form-group'>
          <label>Category:</label>
          <select class="form-control" value={this.state.category}>
            <option value="react">react</option>
            <option value="redux">redux</option>
            <option value="udacity">udacity</option>
          </select>
        </div>
        <button type='submit' className='btn btn-success'>Submit</button>
      </form>
    )
  }
}

export default NewPost;
