import React, { Component } from 'react'
import { connect } from 'react-redux'


class NewComment extends Component {
  state = {
    commentBody: '',
    commentAuthor: '',
  }

  handleFormChange(event, input) {
    this.setState( {[input]: event.target.value} )
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit, postId } = this.props
    const { commentBody, commentAuthor } = this.state
    onSubmit( commentBody, commentAuthor, postId )
    this.setState({ commentBody: '', commentAuthor: ''})
  }

  render() {
    const { commentBody, commentAuthor } = this.state

    return (
      <form className='container' onSubmit={e => this.handleSubmit(e)}>
        <div className='form-group'>
          <input className="form-control" placeholder={'Your Name'} type='text' onChange={(e) => {this.handleFormChange(e, 'commentAuthor')}} value={commentAuthor }/>
        </div>
        <div className='form-group'>
          <textarea className="form-control" placeholder={'Write your comment here.'}  onChange={(e) => {this.handleFormChange(e, 'commentBody')}} value={commentBody}/>
        </div>
        {commentBody !== '' && commentAuthor !== '' ?
        <button type='submit' className={'btn btn-success'}>Submit</button>
        : null
      }
      </form>
    )
  }
}

export default connect()(NewComment);
