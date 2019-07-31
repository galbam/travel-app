import React, { Component } from 'react'
import axios from 'axios'

import { loadGoogleMaps, loadPlaces } from '../utils';
import { category, activityType } from '../constants';
import { InspirationBar } from '../components/InspirationBar';

export class Accommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    let mapPromise = loadGoogleMaps();
    let accommodationPromise = loadPlaces('Berlin', category.HOTEL);

    Promise.all([
      mapPromise,
      accommodationPromise
    ])
    .then(values => {
      let maps = values[0];
      this.accommodations = values[1].response.venues;

      this.google = maps;
      this.markers = [];

      this.infowindow = new maps.maps.InfoWindow();
      this.map = new maps.maps.Map(document.getElementById('map'), {
        zoom: 12,
        scrollwheel: true,
        center: { lat: this.accommodations[0].location.lat, lng: this.accommodations[0].location.lng }
      });

      this.loadMarkers(this.accommodations, activityType.ACCOMMODATION);
    })
  }

  loadMarkers = (venues, type) => {
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

      marker.addListener('click', () => {
        if (marker.getAnimation() !== null) { marker.setAnimation(null); }
        else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
        setTimeout(() => { marker.setAnimation(null) }, 1500);
      });
      this.google.maps.event.addListener(marker, 'click', () => {
         this.infowindow.setContent(marker.name);
         this.map.setCenter(marker.position);
         this.infowindow.open(this.map, marker);
         this.map.panBy(0, -125);
      });
      this.markers.push(marker);
    });

    this.setState({ filteredVenues: this.accommodations });
  }

  listItemClick = (venue) => {
    let marker = this.markers.filter(m => m.id === venue.id)[0];
    this.infowindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
    else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
    setTimeout(() => { marker.setAnimation(null) }, 1500);
  }

  selectVenue = (venue) => {
    axios
    .post("/api/draftActivities", {
      title: venue.name,
      description: '',
      type: venue.type,
      expenses: 0,
      color: 'grey',
      tripId: `${localStorage.getItem('tripId')}`
     })
    .then(response => response.data);
  }

  filter = (query, venues, type) => {
    let f = venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.type === type && marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
        marker.setVisible(true) : marker.setVisible(false);
    });
    this.setState({ filteredVenues: f, query: query });
    return f;
  }

  filterAccommodations = (query) => {
    this.filter(query, this.accommodations, activityType.ACCOMMODATION);
  }

  render() {
    return (
      <div>
        <h3>Accommodation</h3>
      <div style={{display: "flex", height: "100vh"}}>
        <div id="map"></div>
        <div>
            <InspirationBar filterVenues={this.filterAccommodations}
              filteredVenues={this.state.filteredVenues}
              listItemClick={this.listItemClick}
              selectVenue={this.selectVenue} />
        </div>
      </div>
      </div>
    )
  }
}

export default Accommodation
