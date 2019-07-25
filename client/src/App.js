import React, { Component } from "react";
import "./App.css";
import Calendar from "./containers/Calendar"

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Hello world!</h1>
        <Calendar />
      </div>
    );
  }
}

export default App;
