import React, { Component } from 'react';
import querystring from 'querystring';

const API_URL = process.env.REACT_APP_API_URL;

const styles = {
  content: {
    position: 'absolute',
    bottom: '50%',
    background: 'rgba(0, 0, 0, 0.0)',
    color: '#f1f1f1',
    width: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    fontSize: 18,
    padding: 10,
    border: 'none',
    // background: '#000',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    borerRadius: 10,
  },
};

export default class SpotifyAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false,
    };

    // will have localhost:3000 as a param in querystring if on dev, else heroku.
    this.loginUrl = `${API_URL}/spotify/auth/login?${querystring.stringify({ srcUrl: window.location.href })}`;
  }

  renderButton() {
    if (this.state.loggingIn) {
      return <div style={styles.content}>logging into Spotify...</div>;
    }

    return (
      <div>
        <div style={styles.content}>
          <a href={this.loginUrl}>
            <button onClick={() => this.setState({ loggingIn: true })} style={styles.button} type="button">
              join the fun
            </button>
          </a>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}
