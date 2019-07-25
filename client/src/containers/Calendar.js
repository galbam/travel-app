import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import moment from "moment";

import Box from "../components/Box";


class Calendar extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null

    // moment().startOf('month')
  };

  render() {
    let days;

    if (this.state.startDate && this.state.endDate) {
      days =
        moment
          .duration(this.state.endDate.diff(this.state.startDate))
          .asDays() + 1;
    }

    return (
      <div>
        {/* {this.state.startDate && console.log(this.state.startDate.toString())} */}
        <h2> Hello team!</h2>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          firstDayOfWeek={1}
        />

        <div className="box-container">
          

          {this.state.startDate &&
            this.state.endDate &&
            [...Array(days)].map((e, i) => {
              return (
                <Box
                  key={i}
                  dayOfWeek={this.state.startDate.clone().add(i, "days")}
                />
              );
            })}

      
        </div>
      </div>
    );
  }
}

export default Calendar;

// console.log(this.state.startDate.clone().add(i,'days'))}
