import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { TableHead } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import { Typography } from "@material-ui/core";

export class InspirationBar extends Component {
  render() {
    return (
      <div
        id="sidebar"
        style={{ width: "100%", height: "100%", overflowY: "scroll" }}
      >
        <input
          style={{ width: "100%" }}
          value={this.props.query}
          onChange={e => {
            this.props.filterVenues(e.target.value);
          }}
        />
        <Table>
          <TableHead />

          <TableBody>
            {this.props.filteredVenues &&
              this.props.filteredVenues.length > 0 &&
              this.props.filteredVenues.map((venue, index) => (
                <TableRow key={index}>
                  <TableCell style={{ width: "500px" }}>
                    <div
                      onClick={() => {
                        this.props.listItemClick(venue);
                      }}
                    >
                      <Typography variant="button">
                        {venue.name}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="add"
                      onClick={() => {
                        this.props.selectVenue(venue);
                      }}
                    >
                      <AddIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default InspirationBar;
