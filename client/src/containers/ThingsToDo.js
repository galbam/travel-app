import React, { Component } from 'react'

import Map from "./Map"
import Excursions from "./Excursions"
import Food from "./Food"

export class ThingsToDo extends Component {
  render() {
    return (
      <div>
        <h3>Things to do</h3>
        <Map />
        <Excursions />
        <Food />
      </div>
    )
  }
}

export default ThingsToDo
