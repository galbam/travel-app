import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import Tripform from "./containers/Tripform";

// import ThingsToDo from './containers/ThingsToDo'
// import Navbar from "./containers/Navbar"
import MiniDrawer from "./components/planner/MiniDrawer"

// import Planner from "./containers/Planner"
// import Transportation from "./containers/Transportation"
// import Accommodation from "./containers/Accommodation"
// import PackingList from "./containers/PackingList"
// import Budget from "./containers/Budget"

class App extends Component {
  render() {

    return (
     
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tripform" component={Tripform} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route component={MiniDrawer}/>
        </Switch>
      </div>
   
    );
    
  }
}

export default App;
