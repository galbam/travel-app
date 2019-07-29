import React, { Component } from 'react'
import axios from 'axios'

import Sidebar from '../components/Food/Sidebar';
import { loadGoogleMaps, loadPlaces } from '../utils';
import { category } from '../constants';

export class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    let mapPromise = loadGoogleMaps();
    let placesPromise = loadPlaces('Berlin', category.FOOD);

    Promise.all([
      mapPromise,
      placesPromise
    ])
    .then(values => {
      // console.log(values);
      let maps = values[0];
      this.venues = values[1].response.venues;

      this.google = maps;
      this.markers = [];

      this.infowindow = new maps.maps.InfoWindow();
      this.map = new maps.maps.Map(document.getElementById('map'), {
        zoom: 12,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      });

      this.venues.forEach(place => {
        let marker = new maps.maps.Marker({
          position: { lat: place.location.lat, lng: place.location.lng },
          map: this.map,
          venue: place,
          id: place.id,
          name: place.name,
          animation: maps.maps.Animation.DROP
        });

        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
				  else { marker.setAnimation(maps.maps.Animation.BOUNCE); }
				  setTimeout(() => { marker.setAnimation(null) }, 1500);
			  });
        maps.maps.event.addListener(marker, 'click', () => {
  			   this.infowindow.setContent(marker.name);
				   this.map.setCenter(marker.position);
				   this.infowindow.open(this.map, marker);
				   this.map.panBy(0, -125);
			  });
        this.markers.push(marker);
      });

      this.setState({ filteredVenues: this.venues });
    })
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
    console.log("Selected: ", venue.name);
    axios
    .post("/api/draftActivities", {
      title: venue.name,
      description: '',
      type: 'Food',
      expenses: 0,
      color: 'grey',
      tripId: '5d3e015b38661b48bc314cc2' //TODO: get trip id for the current trip
     })
    .then(response => response.data);
  }

  filterVenues = (query) => {
    let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
        marker.setVisible(true) : marker.setVisible(false);
    });
    this.setState({ filteredVenues: f, query: query });
  }
  render() {
    return (
      <div style={{display: "flex", height: "100vh"}}>
        <div id="map"></div>
        <div>
          <h3>Foods and Drinks</h3>
          <Sidebar
            filterVenues={this.filterVenues}
            filteredVenues={this.state.filteredVenues}
            listItemClick={this.listItemClick}
            selectVenue={this.selectVenue} />
        </div>
      </div>
    )
  }
}

export default Food
