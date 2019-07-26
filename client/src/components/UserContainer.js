import React, { Component } from 'react'
import Create from '../containers/Dialogs/Create';

export class UserContainer extends Component {
  render() {
    return (
      <div className="user-container">
        <p>Container</p>
        <Create/>
      </div>
    )
  }
}

export default UserContainer
