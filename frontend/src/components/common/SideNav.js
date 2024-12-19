import React, { Component } from 'react';
import { Nav, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectScreen } from '../../actions';

const styles = {
  sideNav: {
    width: 300,
    padding: 10,
    paddingTop: 50,
  },
  sideNavDiv: {
    width: 200,
  },
  navLink: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'left',
  },
};

class SideNav extends Component {
  render() {
    const { sideNav, navLink, sideNavDiv } = styles;
    const { history } = this.props;
    return (
      <div style={sideNavDiv}>
        <Nav vertical pills style={sideNav}>
          <Button color="link" onClick={() => history.push('/home')} style={navLink}>
            Home
          </Button>
          <Button color="link" onClick={() => history.push('/playlist/new')} style={navLink}>
            New Shmood
          </Button>
          <Button color="link" onClick={() => history.push('/listening-with-you')} style={navLink}>
            Listening With You
          </Button>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedScreen: state.screen.selectedScreen,
});

const mapDispatchToProps = {
  selectScreen,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideNav)
);
