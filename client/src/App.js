import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Tripform from "./containers/Tripform";

import MiniDrawer from "./components/planner/MiniDrawer";
import Boards from "./containers/Boards";

import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import Protected from "./components/Protected";

class App extends Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} user={this.state.user} setUser={this.setUser} />
            )}
          />
          <Protected
            exact
            path="/tripform"
            redirectPath="/signup"
            user={this.state.user}
            setUser={this.setUser}
            component={Tripform}
          />

          <Route exact path="/boards" component={Boards} />
          <Protected
            exact
            path="/login"
            user={!this.state.user}
            setUser={this.setUser}
            component={Login}
          />
          <Protected
            exact
            path="/signup"
            user={!this.state.user}
            setUser={this.setUser}
            component={Signup}
          />

          <Protected
            // exact
            path="/"
            redirectPath="/signup"
            user={this.state.user}
            setUser={this.setUser}
            // render={props => <MiniDrawer {...props} setUser={this.setUser} />}
            component={MiniDrawer}
          />

          <Protected
            exact
            path="/tripform"
            redirectPath="/signup"
            user={this.state.user}
            setUser={this.setUser}
            component={Tripform}
          />

          {/* <Protected
            exact
            path="/boards"
            redirectPath="/signup"
            user={this.state.user}
            setUser={this.setUser}
            component={Boards}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
