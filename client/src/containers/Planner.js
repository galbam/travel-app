import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import axios from "axios";
import Day from "../components/Day";
import UserContainer from "../components/UserContainer";
import Activity from '../components/Activity';

const arrFormats = null;

class Planner extends Component {

  state = {
    totalExpenses: 0,
    startDate: moment(localStorage.getItem('startDate'), arrFormats) || this.props.location.data.startDate,
    endDate: moment(localStorage.getItem('endDate'), arrFormats) || this.props.location.data.endDate,
    focusedInput: null,

    container: {
      id: 1, activities: []
    },
    days: []

  };

  //API CALLS
  //Get all draft activities from a trip
  async getDraftActivities() {
    try {
      const response = await axios.get(`/api/trips/${localStorage.getItem('tripId')}/draftActivities`)
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }

  //Create a new draft activity
  async createDraftActivity(newActivity) {

    const { title, date, description, type, expenses } = newActivity;

    try {
      const response = await axios
        .post("/api/draftActivities", {
          title,
          description,
          type,
          expenses,
          date,
          tripId: `${localStorage.getItem('tripId')}`
        });

      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  //Delete a draft activity
  async deleteDraftActivity(activityId) {
    try {
      const response = await axios.delete(`/api/draftActivities/${activityId}`)
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }

  //Update draft activity date
  async addActivityToDay(dayName, activityId) {
    try {
      const response = await axios.patch(`/api/draftActivities/${activityId}`, {
        date: dayName
      });

      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }

  async updateActivityInDb(updatedActivity) {

    try {
      const response = await axios.patch(`/api/draftActivities/${updatedActivity._id}`, updatedActivity);
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }

  deleteActivity = (activityId) => {

    axios
      .delete(`/api/draftActivities/${activityId}`)
      .then(async () => {        
        
        //Container
        const newContainer = JSON.parse(JSON.stringify(this.state.container));
        const contIndex = newContainer.activities.findIndex(f => f._id === activityId);

        if (contIndex >= 0) {
          newContainer.activities.splice(contIndex, 1);

          this.setState({
            container: newContainer
          });
        }
        else{

          //Days
          const newDays = this.state.days.slice();

          for (let i = 0; i < newDays.length; i++) {
            let index = newDays[i].activities.findIndex(a => a._id === activityId);
            if (index >= 0) {
              newDays[i].activities.splice(index, 1);

              this.setState({
                days: newDays
              });

              break;
            }
          }
        }        

      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount = async () => {

    //Days should be created first
    const daysFilled = this.fillDates(moment(localStorage.getItem('startDate'), arrFormats) || this.state.startDate,
      moment(localStorage.getItem('endDate'), arrFormats) || this.state.endDate);

    //Get container content from DB
    const response = await axios
      .get(`/api/trips/${localStorage.getItem('tripId')}/draftActivities`);

    const newContainer = JSON.parse(JSON.stringify(this.state.container));

    response.data.forEach(a => {

      const dayDate = daysFilled.find(f => f.title.isSame(a.date, 'day'));

      if (dayDate) {
        dayDate.activities.push(a);
        dayDate.expenses += a.expenses;
      }
      else {
        newContainer.activities.push(a);
      }

    });    
    
    this.setState({
      container: newContainer,
      days: daysFilled
    });

    //Update total expenses
    this.updateTotalExpenses();

  }

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
      let index = newContainer.activities.findIndex(a => a._id === activityData._id);
      const activity = newContainer.activities[index];
      newContainer.activities.splice(index, 1);

      //Get day and push the activity
      const newDays = this.state.days.slice();
      const day = newDays.find(d => d.id === target.id);
      day.activities.push(activity);

      //DB -> Add activity to a day
      this.addActivityToDay(day.title.toDate(), activity._id);

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
      let index = originDay.activities.findIndex(a => a._id === activityData._id);
      const originActivity = originDay.activities[index];
      originDay.activities.splice(index, 1);

      //Update expenses
      originDay.expenses = originDay.activities.reduce((acc, val) => {
        return acc + val.expenses;
      }, 0);

      if (target === "container") {
        //const newContainer = JSON.parse(JSON.stringify(this.state.container));
        const newContainer = { ...this.state.container, activities: [...this.state.container.activities] }
        newContainer.activities.push(originActivity);

        //DB -> Add activity to container
        this.addActivityToDay(new Date(), originActivity._id);

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

        //DB -> Add activity to day
        this.addActivityToDay(targetDay.title.toDate(), originActivity._id);

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
      for (let index = 0; index < days; index++) {
        daysArr.push({
          id: index,
          title: startDate.clone().add(index, "days"),
          activities: [],
          expenses: 0
        });
      }
    }

    this.setState({ startDate, endDate, days: daysArr });

    return daysArr;
  }

  populateContainer = () => {

    //Populate content in container
    var activitiesInContainer =
      this.state.container.activities.map(activity => {

        return (

          <Activity key={activity._id} activity={activity}
            id={this.state.container.id}
            onDragStart={this.onDragStart}
            from={"container"}
            updateActivity={(activity) => this.updateActivity(activity)}
            deleteActivity={(activityId) => this.deleteActivity(activityId)}
          />
        );
      });

    return activitiesInContainer;
  }

  refreshContainer = (newContainerActivity) => {

    const { title, date, description, expenses, type } = newContainerActivity;
    
    //Refresh DB container
    //Add activity to container
    const response = this.createDraftActivity(newContainerActivity);
    
    Promise.all([
      response
    ])
      .then(data => {

        const newContainer = JSON.parse(JSON.stringify(this.state.container));
        newContainer.activities.push({
          _id: data[0]._id, title, date, description, type, expenses
        });

        this.setState({
          container: newContainer
        });

      });
  }

  //Search draft activity in container
  searchActivity = async search => {
    let dAct = await this.getDraftActivities();
    const newContainer = { ...this.state.container, activities: dAct }

    if (search && dAct.length > 0) {

      let activitiesFiltered = newContainer.activities.filter(activity => {
        return activity.title.toLowerCase().match(search.toLowerCase())
      });

      if (activitiesFiltered.length > 0) {
        newContainer.activities = activitiesFiltered;

        this.setState({
          container: newContainer
        });
      }

    }
    else {
      this.setState({
        container: newContainer
      });
    }
  }

  //Total expenses
  updateTotalExpenses = () => {

    const days = this.state.days.slice();

    let newTotalExpenses = 0;
    days.forEach(d => {
      if (d.activities.length > 0) {
        d.activities.forEach(a => {
          if (a.expenses) {
            newTotalExpenses += a.expenses;
          }
        })
      }
    });

    this.setState({
      totalExpenses: newTotalExpenses
    });

    //Update total expenses in DB?

  }

  //Update activity
  updateActivity = (activity) => {

    const { _id, title, date, description, expenses, type } = activity;
    const updatedActivity = {
      _id,
      title,
      date,
      description,
      expenses,
      type
    };

    let flagUpdated = false;

    //day
    if (this.state.days.length > 0) {
      const newDays = this.state.days.slice();

      let indexActDay;
      let indexDay;
      for (let index = 0; index < newDays.length; index++) {

        const day = newDays[index];
        let indexFound = day.activities.findIndex(a => a._id === _id);

        if (indexFound >= 0) {
          indexDay = index;
          indexActDay = indexFound;
          break;
        }
      }

      if (indexActDay >= 0) {
        const day = newDays[indexDay];
        day.activities[indexActDay] = updatedActivity;

        //Update expenses per day
        day.expenses = day.activities.reduce((acc, val) => {
          return acc + val.expenses;
        }, 0);

        this.setState({
          days: newDays
        });

        //DB -> update activity in day
        this.updateActivityInDb(updatedActivity);

        //The activity was in day and was updated
        flagUpdated = true;

        //Update total expenses
        this.updateTotalExpenses();
      }
    }

    if (flagUpdated === false) {

      //lets try to find the activity in the container
      const newContainer = JSON.parse(JSON.stringify(this.state.container));
      let indexActContainer = newContainer.activities.findIndex(a => a._id === _id);

      if (indexActContainer >= 0) {

        newContainer.activities[indexActContainer] = updatedActivity;

        this.setState({
          container: newContainer
        });

        //DB -> update activity in container
        this.updateActivityInDb(updatedActivity);

        //The activity was in the container and was updated
        flagUpdated = true;
      }
    }

    //If the flagUpdated remains false that means that the activity was not found in the day or in the container
    if (flagUpdated === false) {
      console.log("The activity was not updated");
    }
  }

  render() {

    return (

      <div className="planner">

        <UserContainer onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "container")}
          containerContent={this.populateContainer()}
          refreshContainer={(x) => this.refreshContainer(x)}
          totalExpenses={this.state.totalExpenses}
          searchActivity={this.searchActivity} />

        <div className="calendar">
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
                      deleteActivity={(activityId) => this.deleteActivity(activityId)}
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