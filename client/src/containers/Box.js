import React, { Component } from 'react'

export class Box extends Component {
  render() {


    return (
      <div className="box">
        <h6>{this.props.dayOfWeek.format("dddd MMMM Do").toString()}</h6>
      </div>
    )
  }
}

export default Box

