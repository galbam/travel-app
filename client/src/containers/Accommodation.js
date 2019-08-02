import React, { Component } from "react";
import axios from "axios";

import { loadGoogleMaps, loadPlaces } from "../utils";
import { category, activityType } from "../constants";
import { InspirationBar } from "../components/InspirationBar";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export class Accommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      location: "Berlin"
    };
  }

  componentDidMount() {
    let location = localStorage.getItem("destination");
    this.setState({ location: location }, () => {
      this.fillingMap();
    });
  }

  loadMarkers = (venues, type) => {
    try {
      venues.forEach(venue => {
        venue.type = type;
        let marker = new this.google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          type: type,
          animation: this.google.maps.Animation.DROP
        });

        marker.addListener("click", () => {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(this.google.maps.Animation.BOUNCE);
          }
          setTimeout(() => {
            marker.setAnimation(null);
          }, 1500);
        });
        this.google.maps.event.addListener(marker, "click", () => {
          this.infowindow.setContent(marker.name);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);
        });
        this.markers.push(marker);
      });

      this.setState({ filteredVenues: this.accommodations });
    } 
    catch (error) {
      console.log(error);
    }
  };

  listItemClick = venue => {
    let marker = this.markers.filter(m => m.id === venue.id)[0];
    this.infowindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.google.maps.Animation.BOUNCE);
    }
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1500);
  };

  selectVenue = venue => {
    axios
      .post("/api/draftActivities", {
        title: venue.name,
        description: "",
        type: venue.type,
        expenses: 0,
        date: new Date(),
        tripId: `${localStorage.getItem("tripId")}`
      })
      .then(response => response.data);
  };

  filter = (query, venues, type) => {
    let f = venues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
    this.markers.forEach(marker => {
      marker.type === type &&
      marker.name.toLowerCase().includes(query.toLowerCase()) === true
        ? marker.setVisible(true)
        : marker.setVisible(false);
    });
    this.setState({ filteredVenues: f, query: query });
    return f;
  };

  filterAccommodations = query => {
    this.filter(query, this.accommodations, activityType.ACCOMMODATION);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.fillingMap();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fillingMap() {
    try {
      let mapPromise = loadGoogleMaps();
      let accommodationPromise = loadPlaces(this.state.location, category.HOTEL);
      Promise.all([mapPromise, accommodationPromise]).then(values => {
        let maps = values[0];
        this.accommodations = values[1].response.venues;
        this.google = maps;
        this.markers = [];
        this.infowindow = new maps.maps.InfoWindow();
        this.map = new maps.maps.Map(document.getElementById("map"), {
          zoom: 12,
          scrollwheel: true,
          center: {
            lat: this.accommodations[0].location.lat,
            lng: this.accommodations[0].location.lng
          }
        });
        this.loadMarkers(this.accommodations, activityType.ACCOMMODATION);
      });
    } 
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
          <div id="map"> </div>
          <div>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                margin: "20px"
              }}
            >
              Accommodation in {this.state.location}
            </Typography>

            <form onSubmit={this.handleSubmit}>
              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}
              >
                Change location to{" "}
                <input
                  type="text"
                  name="location"
                  onChange={this.handleChange}
                  value={this.state.location}
                  style={{ margin: "10px" }}
                />
                <Button
                  variant="contained"
                  style={{
                    background: "#1bacbf",
                    textDecoration: "none",
                    color: "white"
                  }}
                  type="submit"
                >
                  Search
                </Button>
              </Typography>
            </form>
            
            <div style={{ width: "100%", height: "100%", overflowY: "scroll"}}>
            <InspirationBar
              filterVenues={this.filterAccommodations}
              filteredVenues={this.state.filteredVenues}
              listItemClick={this.listItemClick}
              selectVenue={this.selectVenue}
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Accommodation;
