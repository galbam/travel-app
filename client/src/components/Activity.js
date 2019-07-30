import React, { Component } from "react";
import ActivityDetail from "../containers/Dialogs/ActivityDetail";
import "./planner/planner.css";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ListItemIcon from "@material-ui/core/ListItemIcon";

class Activity extends Component {
  render() {

    let bgColor = "gray";
    if (this.props.activity.bgcolor){
      bgColor = this.props.activity.bgcolor;
    }

    return (
      <div
        onDragStart={e =>
          this.props.onDragStart(
            e,
            { from: this.props.from, id: this.props.id },
            this.props.activity
          )
        }
        draggable
        className="draggable"
        style= {{ backgroundColor: bgColor }}
      >
<<<<<<< HEAD
        <div onClick={this.handleClick} className="card-details">
          <ListItemIcon>
            {<PhotoCameraIcon style={{ color: "white" }} />}
          </ListItemIcon>
          <ActivityDetail 
            activity={this.props.activity}
            updateActivity={this.props.updateActivity}
          >
            {this.props.activity.title}
          </ActivityDetail>
=======
        <div onClick={this.handleClick}>
          <ActivityDetail activity={this.props.activity} updateActivity={this.props.updateActivity} />
>>>>>>> Development
        </div>
      </div>
    );
  }
}

export default Activity;
