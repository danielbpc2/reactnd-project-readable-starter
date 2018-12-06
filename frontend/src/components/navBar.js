import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends Component {
  render(){
    const { categories } = this.props
    return(
      <div className='navBar'>
      {this.props.categoryName && <h1>{this.props.categoryName.toUpperCase()}</h1> }
        <div>
          <Link to='/'>Home</Link>
          <Link to='/posts/new'>New Post</Link>
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {categories.map(category => <Link to={`/${category.name}/posts`} className="dropdown-item" key={category.name}>{category.name}</Link>)}
          </div>
        </div>
      </div>
      )
  }
}

function mapStateToProps({categories}, props){
  return{
    categories: Object.keys(categories).map(index => categories[index])
  }
}

export default connect(mapStateToProps)(NavBar)
