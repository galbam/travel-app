import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import moment from "moment";

import Day from "../components/Day";
import UserContainer from "../components/UserContainer";

class Planner extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    // moment().startOf('month')

    container: {
      id: 1, activities: [
        { id: 1, title: "Learn Angular", bgcolor: "yellow", description: "Desc1" },
        { id: 2, title: "Learn React", bgcolor: "blue", description: "Desc2" },
        { id: 3, title: "Vue", bgcolor: "skyblue", description: "Desc3" },
        { id: 4, title: "Vue2", bgcolor: "green", description: "Desc4" }
      ]
    },
    days: []

  };

//DnD
  onDragStart = (ev, origin, activity) => {

    const ori = JSON.stringify(origin);
    ev.dataTransfer.setData("origin", ori);

    const act = JSON.stringify(activity);
    ev.dataTransfer.setData("activity", act);
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, target) => {

    let origin = JSON.parse(ev.dataTransfer.getData("origin"));
    let activityData = JSON.parse(ev.dataTransfer.getData("activity"));

    //console.log("origin:", origin, "target:", target, 'activity ->', activityData);          

    if (origin.from === target) return;

    if (origin.from === "container") {
      //Get activity from container
      const newContainer = JSON.parse(JSON.stringify(this.state.container));
      let index = newContainer.activities.findIndex(a => a.id === activityData.id);
      const activity = newContainer.activities[index];
      newContainer.activities.splice(index, 1);

      //Get day and push the activity
      const newDays = this.state.days.slice();
      const day = newDays.find(d => d.id === target.id);
      day.activities.push(activity);

      this.setState({
        container: newContainer,
        days: newDays
      });
    }
    else if (origin.from === "day") {

      const newDays = this.state.days.slice();

      const originDay = newDays.find(d => d.id === origin.id);
      let index = originDay.activities.findIndex(a => a.id === activityData.id);
      const originActivity = originDay.activities[index];
      originDay.activities.splice(index, 1);

      if (target === "container") {
        const newContainer = JSON.parse(JSON.stringify(this.state.container));
        newContainer.activities.push(originActivity);

        this.setState({
          container: newContainer,
          days: newDays
        });
      }
      else {
        const targetDay = newDays.find(d => d.id === target.id);
        targetDay.activities.push(originActivity);

        this.setState({
          days: newDays
        });
      }
    }
  }
//---

fillDates = (startDate, endDate) => {
  
  let daysArr = [];

  if (startDate && endDate) {
    let days = moment
      .duration(endDate.diff(startDate))
      .asDays() + 1;

    //Create an array of day objects
    for (let index = 1; index <= days; index++) {
      daysArr.push({
        id: index,
        title: startDate.clone().add(index, "days"),
        activities: []
      });
    }
  }
  
  this.setState({ startDate, endDate, days: daysArr });
  
}

populateContainer = () => {

  //Populate content in container
  var activitiesInContainer =
    this.state.container.activities.map(activity => {
      return (
        <div key={activity.id}
          onDragStart={(e) => this.onDragStart(e, { from: "container", id: this.state.container.id }, activity)}
          draggable
          className="draggable"
          style={{ backgroundColor: activity.bgcolor }}
        >
          {activity.title}
        </div>
      );
    });

  return activitiesInContainer;

}

  refreshContainer = (newContainerActivity) => {

    //{ id: 1, title: "Learn Angular", bgcolor: "yellow", description: "Desc1" },
    //title, description, expenses, imageUrl

    const { id, title, description } = newContainerActivity;

    const newContainer = JSON.parse(JSON.stringify(this.state.container));
    newContainer.activities.push({
      id, title, description, bgcolor: "gray"
    });

    this.setState({
      container: newContainer
    });

  }

  render() {

    return (
      <div className="planner">

        <UserContainer onDragOver={(e) => this.onDragOver(e)} 
          onDrop={(e) => this.onDrop(e, "container")} 
          containerContent={this.populateContainer()} 
          refreshContainer={(x) => this.refreshContainer(x)}/>

        <div className="calendar">
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({startDate, endDate}) => this.fillDates(startDate, endDate)} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            firstDayOfWeek={1}
          />
          <div className="scroll-container">
            <div className="box-container">

              {this.state.startDate &&
                this.state.endDate &&
                this.state.days.map((day) => {
                  return (

                    <Day
                      key={day.id}
                      day={day}

                      onDragStart={this.onDragStart}
                      onDragOver={this.onDragOver}
                      onDrop={this.onDrop}
                    />

                  );
                })}

            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Planner;

