import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Tripform from "./containers/Tripform";

// import ThingsToDo from './containers/ThingsToDo'
// import Navbar from "./containers/Navbar"
import MiniDrawer from "./components/planner/MiniDrawer";
import Boards from "./containers/Boards";

// import Planner from "./containers/Planner"
// import Transportation from "./containers/Transportation"
// import Accommodation from "./containers/Accommodation"
// import PackingList from "./containers/PackingList"
// import Budget from "./containers/Budget"

import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import Protected from "./components/Protected"


class App extends Component {
  state={
    user:this.props.user,
  }

  setUser = (user)=>{
    this.setState({user})
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  render={(props)=><Home {...props} user={this.state.user} setUser ={this.setUser}/>} />
          <Protected exact path="/tripform" redirectPath = "/signup" user={this.state.user} setUser ={this.setUser} component={Tripform} />
          <Protected exact path="/login" user={!this.state.user} setUser ={this.setUser} component={Login} />
          <Protected exact path="/signup" user={!this.state.user} setUser ={this.setUser} component={Signup} />
          <Route component={MiniDrawer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
