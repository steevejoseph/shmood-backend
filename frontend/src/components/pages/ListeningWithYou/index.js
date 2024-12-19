/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { selectScreen } from '../../../actions';

import { TopNav, SideNav } from '../../common';
import MapContainer from './MapContainer';

const styles = {
  screenDiv: {
    marginTop: 50,
  },
};

class ListeningWithYou extends Component {
  componentWillMount() {
    this.props.selectScreen('listening-with-you');
  }

  render() {
    return (
      <div>
        <Helmet>
          {/* old, black background */}
          <style>{'body { background-color: #141719; }'}</style>
          {/* <style>{`body { background-color:${this.state.bgcol}; transition: 5000ms ease; }`}</style> */}
        </Helmet>
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          <TopNav />
          <SideNav />
          <div style={styles.screenDiv}>
            <MapContainer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedScreen: state.selectedScreen,
});

export default connect(
  mapStateToProps,
  { selectScreen }
)(ListeningWithYou);
