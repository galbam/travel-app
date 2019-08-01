import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../components/home/home.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { logout } from "./services/auth-service";

export class Home extends Component {
  handleLogout = () => {
    logout().then(() => {
      this.props.setUser(null);

      // Clear all items
      //localStorage.clear();
    });
  };

  render() {
    return (
      <div>
        {/* if(user){
        return (
        <AppBar position="static" style={{ background: "#494847" }}>
        <Toolbar>
          <Link className="home-button" onClick={() => this.handleLogout(this.props)} to="/">Logout</Link>
          <Link cclassName="home-button"  to="*">UserPage</Link>
          </Toolbar>
        </AppBar>
        )
      }else{
        <AppBar position="static" style={{ background: "#494847" }}>
        <Toolbar>
        <Link to="/signup" className="home-button">
            Sign Up
          </Link>
          <Link to="/login" className="home-button">
            Log In
          </Link>
          </Toolbar>
        </AppBar>
      } */}
        <AppBar position="static" style={{ background: "#494847" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Link to="/">
                <img
                  style={{ height: "4.5vh", width: "auto" }}
                  src="/images/logo.png"
                  alt="example"
                />
              </Link>
            </div>
            <div>
              {!this.props.user ? (
                <span>
                  <Button>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </Button>
                  <Button>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Log In
                    </Link>
                  </Button>
                </span>
              ) : (
                <span>
                  <Button>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={() => this.handleLogout()}
                      to="/"
                    >
                      Logout
                    </Link>
                  </Button>
                  <Button>
                    <Link
                      to="/boards"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      My trips
                    </Link>
                  </Button>
                </span>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <div className="home-intro">
          <div className="intro-box">
            <Typography variant="h2" className="intro-text" gutterBottom>
              Travelboard
            </Typography>
            <Typography
              variant="h5"
              className="intro-text"
              style={{ marginBottom: "30px" }}
              gutterBottom
            >
              All-in-one planning tool for your next trip
            </Typography>
            <Button
              variant="contained"
              style={{ background: "#1bacbf" }}
              size="large"
            >
              <Link
                to="/tripform"
                style={{ textDecoration: "none", color: "white" }}
              >
                Start here
              </Link>
            </Button>
          </div>
        </div>

        <div className="home-planner">
          <div className="home-planner-text">
            <Typography variant="h2" gutterBottom>
              Plan your trip
            </Typography>
            <Typography variant="body1" gutterBottom>
              With our planner you can schedule activities during your trip. You
              can fill each day with sightseeing, you can schedule flights, bus
              and train connections and plan accommodation options. Don’t forget
              to add must-try cafes and restaurants! Drag and drop, play around!
              See your expenses for each particular day. It all-in-one planning
              tool!
            </Typography>
          </div>
          <div className="home-planner-img">
            <img src="/images/Screenshot-planner.png" alt="example" />
          </div>
        </div>

        <div className="home-planner">
          <div className="home-planner-img">
            <img src="/images/Screenshot-map.png" alt="example" />
          </div>
          <div className="home-planner-text">
            <Typography variant="h2" gutterBottom>
              Get inspired
            </Typography>
            <Typography variant="body1" gutterBottom>
              Don’t know where to start? We get you covered! Use and integrated
              Google map to find excursions, cafes and restaurants, hotels and
              hostels. Found something worth a visit? Just push a plus button
              and it will magically appear in the container of your planner.
              Drag and drop to the calendar and you’re almost ready to go!
            </Typography>
          </div>
        </div>

        <div className="home-planner">
          <div className="home-planner-text">
            <Typography variant="h2" gutterBottom>
              Be prepared
            </Typography>
            <Typography variant="body1" gutterBottom>
              Last but not least make sure your have everything you need for
              your trip. Our extended packing list will help you not to forget
              anything import. Finally get your finances under control in our
              budget tool. See what are your expenses per each category and
              calculate total expenses for the the whole trip.
            </Typography>
          </div>
          <div className="home-planner-img">
            <img src="/images/Screenshot-planner.png" alt="example" />
          </div>
        </div>

        <div className="footer">
          <div className="footer-text">
            Made by{" "}
            <a href="https://www.linkedin.com/in/gonzalo-alba/">Gonzalo Alba</a>
            , <a href="https://www.linkedin.com/in/adontcova/">Anna Dontcova</a>
            , <a href="https://www.linkedin.com/in/manami-ito/">Manami Ito</a>{" "}
            and{" "}
            <a href="https://www.linkedin.com/in/elizabeth-abramov/">
              Elizabeth Abramov
            </a>{" "}
            during{" "}
            <a href="https://www.ironhack.com/en/courses/web-development-bootcamp">
              Ironhack
            </a>{" "}
            bootcamp. © 2019
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
