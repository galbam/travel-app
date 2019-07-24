import React, { Component } from "react";
import "./App.css";
import Day from "./containers/Day";
import Form from "./containers/Form";
import Create from "./containers/Dialogs/Create";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello world!</h1>
        <Day />
        <Form />
        <Create />
      </div>
    );
  }
}

export default App;
