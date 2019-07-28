import React, { Component } from 'react'

export class Sidebar extends Component {

  componentDidMount() {
  }
  render() {
    return (
      <div id="sidebar">
        <input style={{width: "100%"}} value={this.props.query} onChange={(e) => {this.props.filterVenues(e.target.value)}}/>

        <table>
          <thead>
          </thead>
          <tbody>
          {
            this.props.filteredVenues && this.props.filteredVenues.length > 0 &&
            this.props.filteredVenues.map((venue, index) => (
                <tr>
                  <td>
                    <div key={index} onClick={() => { this.props.listItemClick(venue) }} >
                      <h6>
                      {venue.name}
                      </h6>
                    </div>
                  </td>
                  <td><button onClick={() => { this.props.selectVenue(venue) }}>Select</button></td>
                </tr>
            ))
          }
          </tbody>
        </table>

      </div>
    )
  }
}

export default Sidebar
