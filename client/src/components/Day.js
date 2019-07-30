import React, { Component } from 'react';
import Activity from './Activity';

class Day extends Component {

  render() {
    let styles;
    if (this.props.day.title.format("d").toString() === "6" ||
      this.props.day.title.format("d").toString() === "0") {
      styles = "weekend-box";
    }
    else {
      styles = "box";
    }

    return (
      <div className={styles}
        onDragOver={(e) => this.props.onDragOver(e)}
        onDrop={(e) => this.props.onDrop(e, this.props.day)}>

        <h6>{this.props.day.title.format("dddd MMMM Do").toString()}</h6>

        {this.props.day.activities.map(activity => {
          console.log(activity)
          return (
            <Activity key={activity._id} activity={activity}
              id={this.props.day.id}
              onDragStart={this.props.onDragStart}
              from={"day"} 
              updateActivity={this.props.updateActivity}
              deleteActivity={this.props.deleteActivity}
            />
          );
        })}

        <div>
          <h6>Expenses</h6>
          <p>{this.props.day.expenses || 0}</p>
        </div>
      </div>
      
    )
  }
}

export default Day;
