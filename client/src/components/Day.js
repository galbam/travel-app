import React, { Component } from "react";
import Activity from "./Activity";
import Typography from "@material-ui/core/Typography";

class Day extends Component {
  render() {
    let styles;
    if (
      this.props.day.title.format("d").toString() === "6" ||
      this.props.day.title.format("d").toString() === "0"
    ) {
      styles = "weekend-box";
    } else {
      styles = "box";
    }

    return (
      <div
        className={styles}
        onDragOver={e => this.props.onDragOver(e)}
        onDrop={e => this.props.onDrop(e, this.props.day)}
      >
        <h6 style={{ marginTop: "10px" }}>
          {this.props.day.title.format("dddd MMMM Do").toString()}
        </h6>

        <div className="inside-box">
          <div>
            {this.props.day.activities.map(activity => {
              return (
                <Activity
                  key={activity._id}
                  activity={activity}
                  id={this.props.day.id}
                  onDragStart={this.props.onDragStart}
                  from={"day"}
                  updateActivity={this.props.updateActivity}
                  deleteActivity={this.props.deleteActivity}
                />
              );
            })}
          </div>

          <Typography style={{ textAlign: "center" }} variant="button">
            Expenses <br />
            {this.props.day.expenses || 0}
          </Typography>
        </div>
      </div>
    );
  }
}

export default Day;
