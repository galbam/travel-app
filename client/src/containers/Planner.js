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

    // container: {
    //   id: 1, activities: [
    //     { _id: 1, title: "Learn Angular", bgcolor: "yellow", description: "Desc1", expenses: 10 },
    //     { _id: 2, title: "Learn React", bgcolor: "blue", description: "Desc2", expenses: 20 },
    //     { _id: 3, title: "Vue", bgcolor: "skyblue", description: "Desc3", expenses: 30 },
    //     { _id: 4, title: "Vue2", bgcolor: "green", description: "Desc4", expenses: 40 }
    //   ]
    // },
    container: {
      id: 1, activities: []
    },
    days: []

  };

  async getDraftActivities() {
  try {
    const response = await axios.get(`/api/trips/${localStorage.getItem('tripId')}/draftActivities`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

  // getDraftActivities() {

  //   let drafts = [];
  //   axios
  //     .get(`/api/trips/${localStorage.getItem('tripId')}/draftActivities`)
  //     .then(response => {
  //       drafts = response.data;        
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
      
  //   console.log(drafts)
  //   return drafts;
  // }

  componentDidMount() {
    //this.fillDates(this.state.startDate, this.state.endDate);

    //-----------------------------
    //Get container content from DB
    //localStorage.getItem('tripId')
    axios
      .get(`/api/trips/${localStorage.getItem('tripId')}/draftActivities`)
      .then(response => {

        const newContainer = JSON.parse(JSON.stringify(this.state.container));
        newContainer.activities = response.data;

        this.setState({
          container: newContainer
        });
      })
      .catch(error => {
        console.log(error);
      });
    
    //Days should be created first
    this.fillDates(moment(localStorage.getItem('startDate'), arrFormats) || this.state.startDate,
    moment(localStorage.getItem('endDate'), arrFormats) || this.state.endDate);
    
    //Assign each activity in each day based on name
    //-----------------------------
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
        const newContainer = {...this.state.container, activities: [...this.state.container.activities] }
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

    //Update DB ?

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

          <Activity key={activity._id} activity={activity}
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

    const { _id, title, description, expenses, bgcolor } = newContainerActivity;

    const newContainer = JSON.parse(JSON.stringify(this.state.container));
    newContainer.activities.push({
      _id, title, description, bgcolor, expenses
    });

    this.setState({
      container: newContainer
    });

    //Refresh DB container
    //localStorage.getItem('tripId')


  }

  searchActivity = async search => {
    let dAct = await this.getDraftActivities();
    const newContainer = { ...this.state.container, activities: dAct }
    
    if (search && dAct.length > 0) {

      let activitiesFiltered = newContainer.activities.filter(activity => {
        return activity.title.toLowerCase().match(search.toLowerCase())
      });

      if (activitiesFiltered.length > 0){
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

    //Update total expenses in DB

  }

  updateActivity = (activity) => {

    const { _id, title, description, expenses, bgcolor } = activity;
    const updatedActivity = { 
      _id,
      title, 
      description, 
      expenses, 
      bgcolor
    };

    let flagUpdated = false;

    //day
    if (this.state.days.length > 0){
      const newDays = this.state.days.slice();
      
      let indexActDay;
      let indexDay;
      for (let index = 0; index < newDays.length; index++) {
        
        const day = newDays[index];
        let indexFound = day.activities.findIndex(a => a._id === _id);

        if (indexFound >= 0){
          indexDay = index;
          indexActDay = indexFound;
          break;
        }
        
      }
      
      if(indexActDay >= 0){
        const day = newDays[indexDay];
        day.activities[indexActDay] = updatedActivity;

        //Update expenses per day
        day.expenses = day.activities.reduce((acc, val) => {
          return acc + val.expenses;
        }, 0);
        
        this.setState({
          days: newDays
        });

        //The activity was in day and was updated
        flagUpdated = true;

        //Update total expenses
        this.updateTotalExpenses();
      }
    }

    if (flagUpdated === false){
    
      //lets try to find teh activity in the container
      const newContainer = JSON.parse(JSON.stringify(this.state.container));
      let indexActContainer = newContainer.activities.findIndex(a => a._id === _id);
      
      if (indexActContainer >= 0) {

        newContainer.activities[indexActContainer] = updatedActivity;

        this.setState({
          container: newContainer
        });

        //The activity was in the container and was updated
        flagUpdated = true;
      }
    }

    //If the flagUpdated remains false that means that the activity was not found in the day or in the container
    if (flagUpdated === false){
      console.log("The activity was not updated");
    }

    //DB
    if (flagUpdated){
      //Update activity in DB

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
          searchActivity={this.searchActivity}/>

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