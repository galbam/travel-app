import React, { Component } from 'react';
import ActivityDetail from '../containers/Dialogs/ActivityDetail';

class Activity extends Component {

  render() {

    let bgColor = "gray";
    if (this.props.activity.bgcolor){
      bgColor = this.props.activity.bgcolor;
    }

    return (

      <div
        onDragStart={(e) => this.props.onDragStart(e, { from: this.props.from, id: this.props.id }, this.props.activity)}
        draggable
        className="draggable"
        style= {{ backgroundColor: bgColor }}
      >
        <div onClick={this.handleClick}>
          <ActivityDetail activity={this.props.activity} updateActivity={this.props.updateActivity} />
        </div>
      </div>
    )
  }
}

export default Activity;
