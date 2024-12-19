import React, { Component } from 'react';
import { Button, Navbar } from 'reactstrap';
import { connect } from 'react-redux';
import { selectPlaylistCategory } from '../../actions';

const styles = {
  navLink: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 20,
  },
  topNav: {
    position: 'absolute',
    width: '100%',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 50,
  },
};

class TopNav extends Component {
  render() {
    const { topNav, navLink } = styles;
    // eslint-disable-next-line no-shadow
    const { selectedScreen, selectPlaylistCategory } = this.props;

    switch (window.location.pathname) {
      case '/playlist/new':
        return (
          <Navbar style={topNav}>
            <h2 style={{ color: '#fff' }}>New Shmood</h2>
          </Navbar>
        );
      case '/listening-with-you':
        return (
          <Navbar style={topNav}>
            <h2 style={{ color: '#fff' }}>Users Listening In Your Area</h2>
          </Navbar>
        );
      case 'home':
        return (
          <Navbar style={topNav}>
            <Button color="link" onClick={() => selectPlaylistCategory('')} style={navLink}>
              <h2>All Playlists</h2>
            </Button>
            <Button color="link" onClick={() => selectPlaylistCategory('shmood')} style={navLink}>
              <h2>Shmoods</h2>
            </Button>
          </Navbar>
        );
      default:
        return <div />;
    }
  }
}

const mapStateToProps = state => ({
  selectedPlaylistCategory: state.screen.selectedPlaylistCategory,
  selectedScreen: state.screen.selectedScreen,
});

const mapDispatchToProps = {
  selectPlaylistCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
