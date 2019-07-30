import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Tripform from "./containers/Tripform";

import ThingsToDo from './containers/ThingsToDo'
import Navbar from "./containers/Navbar"

import Planner from "./containers/Planner"
import Transportation from "./containers/Transportation"
import Accommodation from "./containers/Accommodation"
import PackingList from "./containers/PackingList"
import Budget from "./containers/Budget"

import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import Protected from "./components/Protected"


class App extends Component {
  state={
    user:this.props.user
  }

  setUser = (user)=>{
    this.setState({user})
  }

  render() {

    const DefaultMain = () => (
      <div className="main">
           
           <Navbar  setUser ={this.setUser}/>

            <Route exact path="/planner" component={Planner} />
            <Route exact path="/thingstodo" component={ThingsToDo} />
            <Route exact path="/transportation" component={Transportation} />
            <Route exact path="/accommodation" component={Accommodation} />
            <Route exact path="/packinglist" component={PackingList} />
            <Route exact path="/budget" component={Budget} />
  
          </div>
    )

    return (
     
      <div className="App">
        <Switch>
          <Route exact path="/"  component={Home} />
          <Protected exact path="/tripform" redirectPath = "/signup" user={this.state.user} setUser ={this.setUser} component={Tripform} />
          <Protected exact path="/login" user={!this.state.user} setUser ={this.setUser} component={Login} />
          <Protected exact path="/signup" user={!this.state.user} setUser ={this.setUser} component={Signup} />
          <Route component={DefaultMain}/>
        </Switch>
      </div>
   
    );
    
  }
}

export default App;
