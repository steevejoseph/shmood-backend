// this tut was dank.
// https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react

import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './Map';

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    console.log('googkey', process.env);
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name="You" />
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>

        <Marker onClick={this.onMarkerClick} name="Steeve Joseph" position={{ lat: 28.6, lng: -81.2 }} />
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
