import React, { Component } from 'react';
import { Nav, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { useNavigate, useLocation, useParams } from "react-router-dom";
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

function WithRouterWrapper(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };
}

function SideNav({ navigate, location, params }) {
  const { sideNav, navLink, sideNavDiv } = styles;
  return (
    <div style={sideNavDiv}>
      <Nav vertical pills style={sideNav}>
        <Button color="link" onClick={() => navigate("/home")} style={navLink}>
          Home
        </Button>
        <Button
          color="link"
          onClick={() => navigate("/playlist/new")}
          style={navLink}
        >
          New Shmood
        </Button>
        <Button
          color="link"
          onClick={() => navigate("/listening-with-you")}
          style={navLink}
        >
          Listening With You
        </Button>
      </Nav>
    </div>
  );
}

const mapStateToProps = state => ({
  selectedScreen: state.screen.selectedScreen,
});

const mapDispatchToProps = {
  selectScreen,
};

export default WithRouterWrapper(
  connect(mapStateToProps, mapDispatchToProps)(SideNav)
);
