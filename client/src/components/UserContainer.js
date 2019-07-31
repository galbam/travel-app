import React, { Component } from "react";
import Create from "../containers/Dialogs/Create";
import SearchBar from "./SearchBar";
import Typography from "@material-ui/core/Typography";

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
            <Create refreshContainer={this.props.refreshContainer} />
          </div>
          <Typography style={{ textAlign: "center" }} variant="button">
            Total Expenses <br />
            {this.props.totalExpenses}
          </Typography>
        </div>
      </div>
    );
  }
}

export default UserContainer;
