import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import Main from "./containers/Main";

import Create from "./containers/Dialogs/Create";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <Route exact path="/planner" component={Main} />
        </Switch>
        <h1>Hello world!</h1>
        <Create />
      </div>
    );
  }
}

export default App;
