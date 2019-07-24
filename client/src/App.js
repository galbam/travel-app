import React, { Component } from "react";
import "./App.css";
import Day from "./containers/Day"

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Hello world!</h1>
        <Day />
      </div>
    );
  }
}

export default App;
