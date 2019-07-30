import React, { Component } from 'react';
import Create from '../containers/Dialogs/Create';

class UserContainer extends Component {

  handleChange = (event) => {

    const value = event.target.value;
    this.props.searchActivity(value);
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="user-container">
          <div
            onDragOver={(e) => this.props.onDragOver(e)}
            onDrop={(e) => { this.props.onDrop(e, "container") }}>
            <span>CONTAINER</span>
            <br />
            <input type="search" name="search" onChange={this.handleChange} />
            {this.props.containerContent}
          </div>
          <Create refreshContainer={this.props.refreshContainer} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h6>Total Expenses</h6>
          <p>{this.props.totalExpenses}</p>
        </div>
      </div>
    )
  }
}

export default UserContainer;
