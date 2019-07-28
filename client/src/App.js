import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";

import ThingsToDo from './containers/ThingsToDo'
// import Navbar from "./containers/Navbar"
import MiniDrawer from "./components/planner/MiniDrawer"

import Planner from "./containers/Planner"
import Transportation from "./containers/Transportation"
import Accommodation from "./containers/Accommodation"
import PackingList from "./containers/PackingList"
import Budget from "./containers/Budget"

class App extends Component {
  render() {

    const DefaultMain = () => (
      <div >
           
           <MiniDrawer/>

           <div className="main">

            <Route exact path="/planner" component={Planner} />
            <Route exact path="/thingstodo" component={ThingsToDo} />
            <Route exact path="/transportation" component={Transportation} />
            <Route exact path="/accommodation" component={Accommodation} />
            <Route exact path="/packinglist" component={PackingList} />
            <Route exact path="/budget" component={Budget} />
            </div>
          </div>
    )

    return (
     
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route component={DefaultMain}/>
        </Switch>
      </div>
   
    );
    
  }
}

export default App;
