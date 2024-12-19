import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaylistCard from './PlaylistCard';

class PlaylistScreen extends Component {
  constructor(props) {
    super(props);

    this.renderPlaylists = this.renderPlaylists.bind(this);
    console.log(this.props.selectedPlaylistCategory);
  }

  renderPlaylists() {
    const { playlists } = this.props;
    if (playlists) {
      switch (this.props.selectedPlaylistCategory) {
        case 'shmood':
          return playlists
            .filter(playlist => playlist.name.toLowerCase().includes('shmood'))
            .map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />);
        default:
          return playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />);
      }
    }

    return <div>loading...</div>;
  }

  render() {
    return <ol>{this.renderPlaylists()}</ol>;
  }
}

const mapStateToProps = state => ({
  selectedPlaylistCategory: state.screen.selectedPlaylistCategory,
});
export default connect(mapStateToProps)(PlaylistScreen);
