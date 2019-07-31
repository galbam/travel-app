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

class Activity extends Component {
  render() {

    let bgColor = "grey";
    let ourIcon = <FavoriteIcon style={{ color: "white", marginRight: "5px" }}/>

    if (this.props.activity.type === "transportation"){
      bgColor = "#4DA651";
      ourIcon = <CommuteIcon style={{ color: "white", marginRight: "5px"  }}/>
    }

    if (this.props.activity.type === "flight"){
      bgColor = "#4DA651";
      ourIcon = <FlightIcon style={{ color: "white", marginRight: "5px"  }}/>
    }

    if (this.props.activity.type === "food"){
      bgColor = "#E53C38";
      ourIcon = <FoodIcon style={{ color: "white", marginRight: "5px"  }}/>
    }

    if (this.props.activity.type === "sightseeing"){
      bgColor = "#9C26B0";
      ourIcon = <PhotoCameraIcon style={{ color: "white", marginRight: "5px"  }}/>
    }

    if (this.props.activity.type === "accommodation"){
      bgColor = "#FC9712";
      ourIcon = <HotelIcon style={{ color: "white", marginRight: "5px"  }}/>
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
         
            {ourIcon}
          <ActivityDetail 
            activity={this.props.activity}
            updateActivity={this.props.updateActivity}
            deleteActivity={this.props.deleteActivity}
          >
            {this.props.activity.title}
          </ActivityDetail>
        </div>
      </div>
    );
  }
}

export default Activity;
