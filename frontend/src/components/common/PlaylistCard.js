import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, Media } from 'reactstrap';

const styles = {
  card: {
    width: '30em',
    height: '30em',
    margin: '10px',
    float: 'left',
    backgroundColor: '#1a1414',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between',
  },
  cardTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
    height: '50px',
  },
};

export default class PlaylistCard extends Component {
  constructor(props) {
    super(props);

    const uriUnembedded = this.props.playlist.external_urls.spotify;
    const uriSplit = uriUnembedded.split('playlist');
    const uri = `${uriSplit[0]}embed/playlist${uriSplit[1]}`;

    let imgUrl;

    if (this.props.playlist.images && this.props.playlist.images.length > 0) {
      imgUrl = this.props.playlist.images[0].url;
    } else {
      imgUrl =
        'https://i.kinja-img.com/gawker-media/image/upload/s--ypN6iH9q--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/zrarqnhmkoaihvzss5ek.jpg';
    }

    this.state = {
      uri,
      imgUrl,
    };
  }

  render() {
    const { playlist } = this.props;
    const { uri, imgUrl } = this.state;
    const { card, cardTitle } = styles;

    return (
      <Card style={card}>
        <CardTitle style={cardTitle}>{playlist.name}</CardTitle>
        {/* <CardSubtitle>{this.state.uri}</CardSubtitle> */}
        <Link to={`/playlist/${playlist.id}`}>
          <Media>
            <Media object src={imgUrl} alt="Generic placeholder image" width="100%" height="100%" />
          </Media>
        </Link>
        <iframe title={uri} src={uri} width="100%" height="100px" frameBorder="0" allow="encrypted-media" />
      </Card>
    );
  }
}
