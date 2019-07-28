import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import moment from "moment";

import Day from "../components/Day";
import UserContainer from "../components/UserContainer";
import Activity from '../components/Activity';

class Planner extends Component {
  state = {
    totalExpenses: 0,
    startDate: null,
    endDate: null,
    focusedInput: null,
    // moment().startOf('month')

    container: {
      id: 1, activities: [
        { id: 1, title: "Learn Angular", bgcolor: "yellow", description: "Desc1", expenses: 10 },
        { id: 2, title: "Learn React", bgcolor: "blue", description: "Desc2", expenses: 20 },
        { id: 3, title: "Vue", bgcolor: "skyblue", description: "Desc3", expenses: 30 },
        { id: 4, title: "Vue2", bgcolor: "green", description: "Desc4", expenses: 40 }
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

      //Update expenses
      day.expenses = day.activities.reduce((acc, val) => {
        return acc + val.expenses;
      }, 0);

      this.setState({
        container: newContainer,
        days: newDays
      });

      //Update total expenses
      this.updateTotalExpenses();
    }
    else if (origin.from === "day") {

      const newDays = this.state.days.slice();

      const originDay = newDays.find(d => d.id === origin.id);
      let index = originDay.activities.findIndex(a => a.id === activityData.id);
      const originActivity = originDay.activities[index];
      originDay.activities.splice(index, 1);

      //Update expenses
      originDay.expenses = originDay.activities.reduce((acc, val) => {
        return acc + val.expenses;
      }, 0);

      if (target === "container") {
        const newContainer = JSON.parse(JSON.stringify(this.state.container));
        newContainer.activities.push(originActivity);

        this.setState({
          container: newContainer,
          days: newDays
        });

        //Update total expenses
        this.updateTotalExpenses();
      }
      else {
        const targetDay = newDays.find(d => d.id === target.id);
        targetDay.activities.push(originActivity);

        //Update expenses
        targetDay.expenses = targetDay.activities.reduce((acc, val) => {
          return acc + val.expenses;
        }, 0);

        this.setState({
          days: newDays
        });

        //Update total expenses
        this.updateTotalExpenses();
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

          <Activity key={activity.id} activity={activity}
            id={this.state.container.id}
            onDragStart={this.onDragStart}
            from={"container"} 
            updateActivity={(activity) => this.updateActivity(activity)}
            />
        );
      });

    return activitiesInContainer;
  }

  refreshContainer = (newContainerActivity) => {

    const { id, title, description, expenses, bgcolor } = newContainerActivity;

    const newContainer = JSON.parse(JSON.stringify(this.state.container));
    newContainer.activities.push({
      id, title, description, bgcolor, expenses
    });

    //console.log(id, title, description, expenses, bgcolor);

    this.setState({
      container: newContainer
    });
  }

  updateTotalExpenses = () => {

    const days = this.state.days.slice();

    let newTotalExpenses = 0;
    days.forEach(d => {
      if(d.activities.length > 0){
        d.activities.forEach(a => {
          if(a.expenses){
            newTotalExpenses += a.expenses;
          }
        })
      }
    });

    this.setState({
      totalExpenses: newTotalExpenses
    });
  }

  updateActivity = (activity) => {

    // const { id, title, description, expenses, bgcolor } = activity;
    // //console.log(id, title, description, expenses, bgcolor);

    // //day
    // if (this.state.days.length > 0){
    //   const newDays = this.state.days.slice();
      
    //   console.log(newDays);

    //   let indexActDay;
    //   let indexDay;
    //   newDays.forEach(d => {

    //     let indexFound = d.activities.findIndex(a => a.id === id);
    //     if (indexFound >= 0){
    //       indexDay = d.id;
    //       indexActDay = indexFound;
    //     }
        
    //   });
      
    //   if(indexActDay >= 0){
    //     //console.log("Day", indexDay, "Activity in Day", indexActDay);

    //     newDays[indexDay].activities[indexActDay].expenses = expenses;
        
    //     this.setState({
    //       days: newDays
    //     });
    //   }

    // }
    // else if (this.state.container){
    //   // //container
    //   // const newContainer = JSON.parse(JSON.stringify(this.state.container));
    //   // let indexActContainer = newContainer.activities.findIndex(a => a.id === id);
      
    //   // if (indexActContainer >= 0) {
    //   //   console.log("Activity in Container", indexActContainer);

    //   //   newContainer.activities[indexActContainer].expenses = expenses;

    //   //   this.setState({
    //   //     container: newContainer
    //   //   });
    //   // }
    // }

  }

  render() {

    return (
      <div className="planner">

        <UserContainer onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "container")}
          containerContent={this.populateContainer()}
          refreshContainer={(x) => this.refreshContainer(x)}
          totalExpenses={this.state.totalExpenses} />

        <div className="calendar">
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.fillDates(startDate, endDate)} // PropTypes.func.isRequired,
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

                      updateActivity={(activity) => this.updateActivity(activity)}
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