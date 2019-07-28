import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import MiniDrawer from "../components/planner/MiniDrawer"

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar-style">
      
        {/* <ul>
        <li><Link className="mylink" to="/">Home</Link></li>
        <li><Link className="mylink" to="/planner">Planner</Link></li>
        <li><Link className="mylink" to="/thingstodo">Things to do</Link></li>
        <li><Link className="mylink" to="/transportation">Transportation</Link></li>
        <li><Link className="mylink" to="/accommodation">Accommodation</Link></li>
        <li><Link className="mylink" to="/packinglist">PackingList</Link></li>
        <li><Link className="mylink" to="/budget">Budget</Link></li>
        </ul> */}
      </div>
    )
  }
}

export default Navbar
