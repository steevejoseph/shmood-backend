/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Spotify from 'spotify-web-api-js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { getUserData, checkInitialLogin, refreshTokensIfExpired } from '../../assets/scripts/spotify/auth';
import { TopNav, SideNav, PlaylistScreen } from '../common';
import { selectScreen } from '../../actions';

const spotify = new Spotify();
const API_URL = process.env.REACT_APP_API_URL;

const styles = {
  screenDiv: {
    marginTop: 50,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };

    const accessToken = checkInitialLogin();
    if (accessToken) {
      spotify.setAccessToken(accessToken);
      // console.log(`Bearer ${accessToken}`);
      this.props.history.push('/home');
    }

    this.handleAuthRefresh = this.handleAuthRefresh.bind(this);
    this.handleUpdateUserLocation = this.handleUpdateUserLocation.bind(this);
  }

  componentWillMount() {
    this.props.selectScreen('home');
  }

  componentDidMount() {
    this.handleAuthRefresh();
    this.handleUpdateUserLocation();

    // might need a .catch() if req fails...
    // refresh token?
    spotify.getUserPlaylists().then(data => {
      const playlists = data.items;
      this.setState({ playlists });
    });
  }

  handleAuthRefresh() {
    const spotifyTokenExpirationTime = getUserData('spotifyTokenExpirationTime');

    if (!spotifyTokenExpirationTime) {
      this.props.history.push('/');
    }

    refreshTokensIfExpired();
    spotify.setAccessToken(getUserData('spotifyAccessToken'));
  }

  async handleUpdateUserLocation() {
    const me = await spotify.getMe();

    // Segment Analytics
    window.analytics.identify(me.id, {
      name: me.display_name,
      email: me.email,
    });

    const succ = position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log('lat:', position.coords.latitude);
      console.log('long:', position.coords.longitude);
      axios
        .post(`${API_URL}/users/update-user-location`, { spotifyId: me.id, lat, lng })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    const fail = err => {
      console.log('yeet, cannot get location!');
    };

    navigator.geolocation.getCurrentPosition(succ, fail);
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #141719; }'}</style>
        </Helmet>
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          <TopNav />
          <SideNav />
          <div style={styles.screenDiv}>
            <PlaylistScreen playlists={this.state.playlists} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedScreen: state.screen.selectedScreen,
});

export default withRouter(
  connect(
    mapStateToProps,
    { selectScreen }
  )(Home)
);
