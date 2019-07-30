import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../components/home/home.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { logout } from "./services/auth-service"

export class Home extends Component {
   
  handleLogout = props => {
    console.log(props)
    logout().then(() => {
      props.setUser(null);
    });
  };

  render() {
    return (
      <div>
        <AppBar position="static" style={{ background: "#494847" }}>
          <Toolbar>

          <Link to="/signup" className="home-button">
            Sign Up
          </Link>
          
          <Link to="/login" className="home-button">
            Log In
          </Link>
          
          <Link className="home-button" onClick={() => this.handleLogout(this.props)} to="/">Logout</Link>

          </Toolbar>
        </AppBar>

        <div className="home-intro">
          <Button
            variant="contained"
            style={{ background: "#1bacbf" }}
            size="large"
          >

            <Link to="/tripform" className="home-button">
              Start here
            </Link>

          </Button>
        </div>

        <div className="home-planner">
          <div className="home-planner-text">
            <Typography variant="h2" gutterBottom>
              Plan your trip
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </div>
          <div className="home-planner-img">
            <img src="/images/screenshot.png" alt="example" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
