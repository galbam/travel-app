import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to home page</h1>
        <Link to="/planner">Start here</Link>
      </div>
    )
  }
}

export default Home
