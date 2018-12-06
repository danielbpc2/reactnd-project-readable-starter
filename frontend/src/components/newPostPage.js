import React, {Fragment} from 'react'
import  NewPost from './newPost'
import  NavBar from './navBar'

const newPostPage = (props) => (
    <Fragment>
      <NavBar/>
      <div className='container'>
        <NewPost/>
      </div>
    </Fragment>
  )

export default newPostPage
