import React, { Component } from 'react';
import ActivityDetail from '../containers/Dialogs/ActivityDetail';

class Activity extends Component {

  render() {
    return (

      <div
        onDragStart={(e) => this.props.onDragStart(e, { from: this.props.from, id: this.props.id }, this.props.activity)}
        draggable
        className="draggable"
        style={{ backgroundColor: this.props.activity.bgcolor }}
      >
        <div onClick={this.handleClick}>
          <ActivityDetail activity={this.props.activity}>
            {this.props.activity.title}
          </ActivityDetail >
        </div>
      </div>
    )
  }
}

export default Activity;
