import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

// import Navbar from "./containers/Navbar"
// import Home from "./containers/Home"
import Calendar from "./containers/Calendar"
// import Inspirations from "./containers/Inspirations"
// import PackingList from "./containers/PackingList"

class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <Navbar />
        <Home /> */}
        <Calendar />
        {/* <Inspirations />
        <PackingList /> */}
      </div>
    );
  }
}

export default App;
