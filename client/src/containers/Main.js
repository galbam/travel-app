import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

import Navbar from "./Navbar"
import Planner from "./Planner"
import ThingsToDo from "./ThingsToDo.js"
import Transportation from "./Transportation"
import Accommodation from "./Accommodation"
import PackingList from "./PackingList"
import Budget from "./Budget"

export class Main extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <p>goes to navbar. temporary here to check routes</p> 
        <ul>
       <li> <a href="/">Home</a> </li>
        <li> <a href="/thingstodo">Things to do</a></li>
        <li> <a href="/transportation">Transportation</a></li>
        <li><a href="/accommodation">Accommodation</a></li>
        <li> <a href="/packinglist">PackingList</a></li>
        <li>  <a href="/budget">Budget</a></li>
        </ul>
        <Switch>
        <Route exact path="/planner" component={Planner} />
        <Route exact path="/thingstodo" component={ThingsToDo} />
        <Route exact path="/transportation" component={Transportation} />
        <Route exact path="/accommodation" component={Accommodation} />
        <Route exact path="/packinglist" component={PackingList} />
        <Route exact path="/budget" component={Budget} />
        </Switch>
      </div>
    )
  }
}

export default Main
