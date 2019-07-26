import React, { Component } from 'react'

export class Day extends Component {
  

  render() {
console.log(this.props.dayOfWeek.format("d").toString())
   let styles 
    if (this.props.dayOfWeek.format("d").toString() === "6" || this.props.dayOfWeek.format("d").toString() === "0") {
   styles = "weekend-box"
    }
    else styles = "box"

    return (
      <div className={styles}>
        <h6>{this.props.dayOfWeek.format("dddd MMMM Do").toString()}</h6>
      </div>
    )
  }
}

export default Day

