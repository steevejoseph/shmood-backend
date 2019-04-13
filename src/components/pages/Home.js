/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Spotify from 'spotify-web-api-js';
import { withRouter } from 'react-router-dom';

import NewPlaylistForm from '../forms/NewPlaylistForm';
import { getUserData, checkInitialLogin, refreshTokensIfExpired } from '../../assets/scripts/spotify/auth';
import { TopNav, SideNav, PlaylistScreen } from '../common';
import ListeningWithYou from './ListeningWithYou/ListeningWithYou';

const spotify = new Spotify();

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
  }

  componentDidMount() {
    const spotifyTokenExpirationTime = getUserData('spotifyTokenExpirationTime');

    // user should have a token exp time, if not, redirect to login
    if (!spotifyTokenExpirationTime) {
      this.props.history.push('/');
    }

    refreshTokensIfExpired();
    spotify.setAccessToken(getUserData('spotifyAccessToken'));

    // might need a .catch() if req fails...
    // refresh token?
    spotify.getUserPlaylists().then(data => {
      const playlists = data.items;
      this.setState({ playlists });
    });

    const bgColors = ['#11001C', '#3A015C', '#1B2021', '#353950', '#5f432b', '#274d61'];

    let colCounter = 0;
    this.interval = setInterval(() => {
      // eslint-disable-next-line no-plusplus
      const bgcol = bgColors[++colCounter % bgColors.length];
      this.setState(() => ({ bgcol }));
    }, 3000);
  }

  renderScreen() {
    // console.log(this.props.selectedScreen);
    switch (this.props.selectedScreen) {
      case 'newPlaylist':
        return <NewPlaylistForm />;
      case 'listeningWithYou':
        return <ListeningWithYou />;
      default:
        return <PlaylistScreen playlists={this.state.playlists} />;
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          {/* old, black background */}
          {/* <style>{'body { background-color: #141719; }'}</style> */}
          <style>{`body { background-color:${this.state.bgcol}; transition: 5000ms ease; }`}</style>
        </Helmet>
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          <TopNav />
          <SideNav />
          <div style={styles.screenDiv}>{this.renderScreen()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedScreen: state.screen.selectedScreen,
});

export default withRouter(connect(mapStateToProps)(Home));
