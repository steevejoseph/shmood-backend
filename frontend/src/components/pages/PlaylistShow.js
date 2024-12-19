import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Spotify from 'spotify-web-api-js';
import Spinner from 'react-spinkit';
import { getUserData, refreshTokensIfExpired } from '../../assets/scripts/spotify/auth';
import { PlaylistCard, SideNav, TopNav } from '../common';

const spotify = new Spotify();

const styles = {
  screenDiv: {
    marginTop: 50,
  },
};
export default class PlaylistShow extends Component {
  state = {
    playlist: null,
    loading: true,
  };

  constructor(props) {
    super(props);
    const spotifyTokenExpirationTime = getUserData('spotifyTokenExpirationTime');
    if (!spotifyTokenExpirationTime) {
      this.props.history.push('/');
    }
    refreshTokensIfExpired();
    spotify.setAccessToken(getUserData('spotifyAccessToken'));

    const playlistId = this.props.match.params.id;

    spotify
      .getPlaylist(playlistId)
      .then(res => {
        this.setState({ playlist: res });
      })
      .catch(err => {
        console.log('Error fetching new playlist', err);
        this.props.history.push('/home');
      });

    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1500);
    }
  }

  renderPlaylist() {
    if (!this.state.playlist || this.state.loading) {
      return (
        <div>
          <Spinner name="line-scale" color="white" />
        </div>
      );
    }

    return <PlaylistCard playlist={this.state.playlist} />;
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #141719; }'}</style>
          {/* <style>{`body { background-color:${this.state.bgcol}; transition: 5000ms ease; }`}</style> */}
        </Helmet>
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          <TopNav />
          <SideNav />
          <div style={styles.screenDiv}>{this.renderPlaylist()}</div>
        </div>
      </div>
    );
  }
}
