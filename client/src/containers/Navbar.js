import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { logout } from "./services/auth-service"

import MiniDrawer from "../components/planner/MiniDrawer"

export class Navbar extends Component {
  
  handleLogout = props => {
    console.log(props)
    logout().then(() => {
      props.setUser(null);
    });
  };


  render() {
    return (
      <div className="navbar-style">
      
      
        <li><Link className="mylink" onClick={() => this.handleLogout(this.props)} to="/">Logout</Link></li>
       
      </div>
    )
  }
}

export default Navbar
