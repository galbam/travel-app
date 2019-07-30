import React, { Component } from "react";
import ActivityDetail from "../containers/Dialogs/ActivityDetail";
import "./planner/planner.css";

//icons
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CommuteIcon from "@material-ui/icons/Commute";
import FlightIcon from "@material-ui/icons/Flight";
import FoodIcon from "@material-ui/icons/Restaurant";
import HotelIcon from "@material-ui/icons/Hotel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListItemIcon from "@material-ui/core/ListItemIcon";

class Activity extends Component {
  render() {
console.log(this.props.activity.type)
    let bgColor = "grey";
    let ourIcon = <FavoriteIcon style={{ color: "white" }}/>

    if (this.props.activity.type === "transportation"){
      bgColor = "#4DA651";
      ourIcon = <CommuteIcon style={{ color: "white" }}/>
    }

    if (this.props.activity.type === "flight"){
      bgColor = "#4DA651";
      ourIcon = <FlightIcon style={{ color: "white" }}/>
    }

    if (this.props.activity.type === "food"){
      bgColor = "#E53C38";
      ourIcon = <FoodIcon style={{ color: "white" }}/>
    }

    if (this.props.activity.type === "sightseeing"){
      bgColor = "#9C26B0";
      ourIcon = <PhotoCameraIcon style={{ color: "white" }}/>
    }

    if (this.props.activity.type === "accommodation"){
      bgColor = "#FC9712";
      ourIcon = <HotelIcon style={{ color: "white" }}/>
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
        <div onClick={this.handleClick} className="card-details">
          <ListItemIcon>
            {ourIcon}
          </ListItemIcon>
          <ActivityDetail 
            activity={this.props.activity}
            updateActivity={this.props.updateActivity}
          >
            {this.props.activity.title}
          </ActivityDetail>
        </div>
      </div>
    );
  }
}

export default Activity;
