import React, { Component } from "react";
import Create from "../containers/Dialogs/Create";
import SearchBar from "./SearchBar";

class UserContainer extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="user-container">
          <div
            onDragOver={e => this.props.onDragOver(e)}
            onDrop={e => {
              this.props.onDrop(e, "container");
            }}
          >
            <SearchBar searchActivity={this.props.searchActivity} />
            {this.props.containerContent}
          </div>
          <Create refreshContainer={this.props.refreshContainer} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h6>Total Expenses</h6>
          <p>{this.props.totalExpenses}</p>
        </div>
      </div>
    );
  }
}

export default UserContainer;
