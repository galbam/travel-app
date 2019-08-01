import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { groupBy } from "../../src/utils.js";

class Budget extends Component {
  state = {
    activitiesOrderedBy: null
  };

  async componentDidMount() {
    try {
      //Get activities from current trip
      const response = await axios.get(
        `/api/trips/${localStorage.getItem("tripId")}`
      );

      //Order activities by type
      const orderedBy = groupBy(response.data.draftActivity, "type");

      this.setState({
        activitiesOrderedBy: orderedBy
      });

      return orderedBy;
    } catch (error) {
      console.error(error);
    }
  }

  getExpensesPerActivity(result, key, totalTransportation) {
    result[key].forEach(ex => {
      totalTransportation += ex.expenses;
    });

    return totalTransportation;
  }

  render() {
    let total = 0;
    let totalTransportation = 0;
    let totalFlights = 0;
    let totalAccommodation = 0;
    let totalFoodDrinks = 0;
    let totalSightseeing = 0;
    let totalOther = 0;

    const result = JSON.parse(JSON.stringify(this.state.activitiesOrderedBy));

    for (let key in result) {
      switch (key) {
        case "transportation":
          totalTransportation = this.getExpensesPerActivity(
            result,
            key,
            totalTransportation
          );
          total += totalTransportation;
          break;

        case "flight":
          totalFlights = this.getExpensesPerActivity(result, key, totalFlights);
          total += totalFlights;
          break;

        case "accommodation":
          totalAccommodation = this.getExpensesPerActivity(
            result,
            key,
            totalAccommodation
          );
          total += totalAccommodation;
          break;

        case "food":
          totalFoodDrinks = this.getExpensesPerActivity(
            result,
            key,
            totalFoodDrinks
          );
          total += totalFoodDrinks;
          break;

        case "sightseeing":
          totalSightseeing = this.getExpensesPerActivity(
            result,
            key,
            totalSightseeing
          );
          total += totalSightseeing;
          break;

        case "other":
          totalOther = this.getExpensesPerActivity(result, key, totalOther);
          total += totalOther;
          break;

        default:
          break;
      }
    }

    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Paper style={{ width: "80%", marginTop: "3" }}>
          <Table style={{ minWidth: "700" }}>
            <TableHead>
              <TableRow>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>PRICE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Transportation</TableCell>
                <TableCell>{totalTransportation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Flights</TableCell>
                <TableCell>{totalFlights}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Accommodation</TableCell>
                <TableCell>{totalAccommodation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Food & Drinks</TableCell>
                <TableCell>{totalFoodDrinks}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sightseeing / Excursions</TableCell>
                <TableCell>{totalSightseeing}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Other</TableCell>
                <TableCell>{totalOther}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>TOTAL</strong>
                </TableCell>
                <TableCell>
                  <strong>{total}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Budget;
