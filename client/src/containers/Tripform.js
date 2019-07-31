import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import axios from "axios";
// import moment from "moment";

//style
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import CommuteIcon from "@material-ui/icons/Commute";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const divStyle = {
  marginTop: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

export default class Tripform extends Component {
  state = {
    title: "",
    description: "",
    destination: "",
    startDate: null,
    endDate: null,
    focusedInput: null,
    userId: this.props.user._id
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    const { title, description, destination, startDate, endDate } = this.state;
    const userId = this.state.userId;

    axios
      .post("/api/trips", {
        title,
        description,
        destination,
        startDate,
        endDate,
        userId
       })
      .then(response => {
        //Save Trip ID and destination
        localStorage.setItem("tripId", response.data._id);
        localStorage.setItem("destination", destination);
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);

        this.props.history.push({
          pathname: "/planner",
          data: {
            startDate: startDate,
            endDate: endDate
          }
        });
      })
      .catch(error => {
        this.setState({ err: error });
      });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={divStyle}>
          <Avatar style={{ backgroundColor: "rgb(73,72,71)" }}>
            <CommuteIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ margin: "2%" }}>
            Choose your trip
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  name="title"
                  id="title"
                  label="Trip title"
                  autoComplete="trip title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="textarea"
                  name="description"
                  id="description"
                  label="Trip description"
                  autoComplete="trip description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Grid>
              ​
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="destination"
                  name="destination"
                  id="destination"
                  label="Destination"
                  autoComplete="destination"
                  value={this.state.destination}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DateRangePicker
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) =>
                 this.setState({ startDate, endDate })
                  } // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput =>
                    this.setState({ focusedInput })
                  } // PropTypes.func.isRequired,
                  firstDayOfWeek={1}
                />
              </Grid>
              ​
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "3%", backgroundColor: "rgb(27,172, 191)" }}
            >
              Submit
            </Button>
            ​
          </form>
        </div>
        ​
      </Container>
    );
  }
}