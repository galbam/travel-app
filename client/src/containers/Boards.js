import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "../components/boards/board.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

const BootstrapButton = withStyles({
  root: {
    margin: "3",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 18,
    padding: "30px 40px",
    border: "5px solid",
    lineHeight: 1.5,
    backgroundColor: "#00ACC0",
    borderColor: "#00ACC0",
    fontFamily: ["Roboto"].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
})(Button);

class Boards extends Component {
  state = {
    tripArray: []
  };

  handleClick = trip => {
    console.log(trip.destination);

    //Update user info
    localStorage.setItem("tripId", trip._id);
    localStorage.setItem("destination", trip.destination);
    localStorage.setItem("startDate", trip.startDate);
    localStorage.setItem("endDate", trip.endDate);

    //Redirect to planner
    this.props.history.push("/planner");
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/api/trips/${localStorage.getItem("userId")}/all`
      );
      this.setState({
        tripArray: response.data
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const trip = this.state.tripArray.slice().map(t => {
      return (
        <div key={t._id}>
          <BootstrapButton
            onClick={() => this.handleClick(t)}
            variant="contained"
            color="primary"
          >
            <Typography variant="h4">{t.title}</Typography>
          </BootstrapButton>
        </div>
      );
    });

    return (
      <div>
        <AppBar position="static" style={{ background: "#494847" }}>
          <Toolbar>
            <Link to="/">
              <img className="logo" src="/images/logo.png" alt="example" />
            </Link>
          </Toolbar>
        </AppBar>
        <div
          className="board-intro"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
          }}
        >
          {trip}
        </div>
      </div>
    );
  }
}

export default Boards;
