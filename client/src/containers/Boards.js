import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "../components/boards/board.css";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

class Boards extends Component {
  state = {
    tripArray: []
  };

  handleClick = trip => {
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
          <Card className="card" style={{ width: "400px", minHeight: "150px" }}>
            <CardActionArea>
              <CardContent>
                <div className="title">
                  <Typography gutterBottom variant="h5" component="h2">
                    {t.title}
                  </Typography>
                </div>
                <Typography variant="body2" color="textSecondary" component="div">
                  <div className="description">{t.description}</div>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <div className="button">
                <Button
                  onClick={() => this.handleClick(t)}
                  size="small"
                  color="primary"
                  style={{ justifySelf: "flex-end" }}
                >
                  Go to Board
                </Button>
                <Button size="small" color="primary">
                  Delete
                </Button>
              </div>
            </CardActions>
          </Card>
        </div>
      );
    });
    return (
      <div>
        <AppBar position="static" style={{ background: "#494847" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Link to="/">
                <img
                  className="logo"
                  src="/images/logo.png"
                  alt="example"
                  style={{ marginRight: "auto" }}
                />
              </Link>
            </div>

            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/tripform"
              >
                Create a New Board
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <div
          className="board-intro"
          style={{
            display: "flex",
            justifyContent: "center",
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
