const express = require('express');

const router = express.Router();
const querystring = require('querystring');
const urljoin = require('url-join');
const SpotifyWebApi = require('spotify-web-api-node');
const userMiddleware = require('../../middleware/user');

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};

const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',

  'playlist-read-private',
  'playlist-read-collaborative',

  'user-modify-playback-state',

  'user-library-modify',
  'user-library-read',

  'user-read-currently-playing',
  'user-read-email',
  'user-read-playback-state',
  'user-read-private',
  'user-read-recently-played',
  'user-top-read',

  'ugc-image-upload',
];

let srcUrl;
const spotify = new SpotifyWebApi(credentials);

const generateFrontendURL = (unformattedUrl) => {
  // nifty little lambda that adds protocol if protocol not given.
  // https://stackoverflow.com/a/53206485
  // modified to accept intent:// scheme (android) shmood:// scheme (ios)
  const withProtocol = url => (!/^intent|shmood|https?:\/\//i.test(url) ? `http://${url}` : url);
  srcUrl = withProtocol(unformattedUrl);

  // handle mobile redirect. mobile is absolutely broken af rn.
  if (srcUrl.startsWith('intent://')) {
    console.log('android redirect not implemented!');
  }
  if (srcUrl.startsWith('shmood://')) {
    console.log('ios redirect not implemented!');
  } else {
    srcUrl = urljoin(srcUrl, 'home', '#');
  }

  return srcUrl;
};

router.get('/login', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  srcUrl = req.query.srcUrl;

  const authorizeURL = spotify.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
});

/* Handle authorization callback from Spotify */
router.get('/callback', (req, res) => {
  const { code } = req.query;
  // const { state } = req.query;

  /* Get the access token! */
  spotify
    .authorizationCodeGrant(code)
    .then((data) => {
      const { expires_in, access_token, refresh_token } = data.body;

      spotify.setAccessToken(access_token);
      spotify
        .getMe()
        .then((me) => {
          userMiddleware.addUserToDb(me);
        });

      srcUrl = generateFrontendURL(srcUrl);

      res.redirect(
        `${srcUrl}${querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        })}`,
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(err.code);
      res.send(err.message);
    });
});

router.post('/refresh_token', (req, res) => {
  const { accessToken, refreshToken } = req.body;
  spotify.setAccessToken(accessToken);
  spotify.setRefreshToken(refreshToken);

  spotify
    .refreshAccessToken()
    .then((data) => {
      console.log('token has been refreshed!');
      spotify.setAccessToken(data.body.access_token);
      res.send(data.body);
    })
    .catch((err) => {
      console.log('Could not refresh access token', err);
      res.status(400).send(err);
    });
});

router.get('/get-credentials', (req, res) => {
  // TODO: should update to check if this request is being made from a
  //  trusted source (ex: heroku)
  res.json(credentials);
});

module.exports = router;
