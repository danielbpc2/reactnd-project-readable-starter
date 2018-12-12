import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends Component {
  render(){
    const { categories, categoryName } = this.props
    return(
      <div className='navBar'>
      {categoryName ? <h3><Link id="logo-nav" to={`/${categoryName}`}>{categoryName.toUpperCase()}</Link></h3> : <h3><Link id="logo-nav" to='/'> Readable App </Link></h3> }
        <div className='nav-control'>
          {categoryName ? <Link className='nav-links' to='/'>Home</Link> : null}
          <Link className='nav-links' to='/posts/new'>New Post</Link>
          <div className="dropdown">
            <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categories
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {categories.map(category => <Link to={`/${category.name}`} className="dropdown-item text-black" key={category.name}>{category.name}</Link>)}
            </div>
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
