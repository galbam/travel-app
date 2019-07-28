import React, { Component } from 'react';

class Activity extends Component {

  render() {
    return (

      <div
        onDragStart={(e) => this.props.onDragStart(e, { from: this.props.from, id: this.props.id }, this.props.activity)}
        draggable
        className="draggable"
        style={{ backgroundColor: this.props.activity.bgcolor }}
      >
        {this.props.activity.title}
      </div>
    )
  }
}

export default Activity;
