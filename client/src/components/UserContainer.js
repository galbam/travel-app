import React, { Component } from 'react';
import Create from '../containers/Dialogs/Create';

class UserContainer extends Component {

  render() {
    return (
      <div className="user-container">
        <div
          onDragOver={(e) => this.props.onDragOver(e)}
          onDrop={(e) => { this.props.onDrop(e, "container") }}>
          <span>CONTAINER</span>
          {this.props.containerContent}
        </div>
        <Create refreshContainer={this.props.refreshContainer} />

        <br/>
        <br/>
        <br/>
        <div>
          <h6>Total Expenses</h6>
          <p>{this.props.totalExpenses}</p>
        </div>
      </div>
    )
  }
}

export default UserContainer;
