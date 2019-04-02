const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const urljoin = require('url-join');
const request = require('request'); // "Request" library
const spotifyWebApi = require('spotify-web-api-node');


// router.use(require('cors'));
const REACT_URI = process.env.REACT_URI;

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
}

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-currently-playing',
  'playlist-read-private',
  'user-read-playback-state',
]

// console.log(credentials);
const spotify = new spotifyWebApi(credentials);

router.get('/login', function (req, res) {
  const authorizeURL = spotify.createAuthorizeURL(scopes);
  // console.log(authorizeURL);
  res.redirect(authorizeURL);
});

/* Handle authorization callback from Spotify */
router.get('/callback', function(req, res) {

  /* Read query parameters */
  var code  = req.query.code; // Read the authorization code from the query parameters
  var state = req.query.state; // (Optional) Read the state from the query parameter

  /* Get the access token! */
  spotify
    .authorizationCodeGrant(code)
    .then(data => {
      // console.log(data.body)
      const { expires_in, access_token, refresh_token } = data.body;
      // console.log(`The token expires in ${expires_in}`);
      // console.log(`The access token is  ${access_token}`);
      // console.log(`The refresh token is ${refresh_token}`);

      /* Ok. We've got the access token!
         Save the access token for this user somewhere so that you can use it again.
         Cookie? Local storage?
      */
      // send token back?
      // res.status(200).send(data.body);
      
      console.log(req.headers.referer);

      // <srcUrl.com>/home/#
      const srcUrl = urljoin(req.headers.referer, 'home', '#');

      /* Redirecting back from whence we came! :-) */
      res.redirect(`${srcUrl}` +
      querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token
      }));    
    }) 
    .catch((err) => {
      res.status(err.code);
      res.send(err.message);
    });
});

router.get('/refresh_token', function (req, res) {
  spotify
    .refreshAccessToken()
    .then(data => {
      console.log('token has been refreshed!');
      spotify.setAccessToken(data.body['access_token']);

      // send new token back?
    })
    .catch(err => {
      console.log('Could not refresh access token',err);
    })
});

module.exports = router;