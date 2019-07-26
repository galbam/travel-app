import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import "./index.css";
// import 'bootstrap/dist/css/bootstrap.css';
// import axios from "axios"; 

// axios
//   .get("/api/auth/loggedin")
//   .then(response => {
    ReactDOM.render(
      <BrowserRouter>
         <App />
        {/* <App user={response.data} /> */}
      </BrowserRouter>,
      document.getElementById("root")
    );
  // })
  // .catch(err => {
  //   console.log(err);
  // });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
