import React, { Component } from 'react';

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
          return (
            <div key={activity.id}
              onDragStart={(e) => this.props.onDragStart(e, { from: "day", id: this.props.day.id }, activity)}
              draggable
              className="draggable"
              style={{ backgroundColor: activity.bgcolor }}
            >
              {activity.title}
            </div>
          );
        })}

      </div>
    )
  }
}

export default Day;
