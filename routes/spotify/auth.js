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
  
  'ugc-image-upload'
]

let srcUrl;

// console.log(credentials);
const spotify = new spotifyWebApi(credentials);

router.get('/login', function (req, res) {

  // keep track of the url that called us so we can redirect back later
  srcUrl = req.query.srcUrl;

  const authorizeURL = spotify.createAuthorizeURL(scopes);
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
      // send token back? guess not
      // res.status(200).send(data.body);
      
      // nifty little lambda that adds protocol if protocol not given.
      // https://stackoverflow.com/a/53206485
      // modified to accept intent:// scheme (android) shmood:// scheme (ios)
      const withProtocol = url => !/^intent|shmood|https?:\/\//i.test(url) ? `http://${url}` : url;

      // format with protocol to return to http://<srcUrl>/home/#
      srcUrl = withProtocol(srcUrl);

      // handle mobile redirect. mobile is absolutely broken af rn.
      if(srcUrl.startsWith('intent://')) {
        // srcUrl = `intent://home/#Intent;scheme=shmood;package=com.shmood;`
        // srcUrl += `S.access_token=${encodeURIComponent(access_token)};`
        // srcUrl += `S.refresh_token=${encodeURIComponent(refresh_token)};`;
        // srcUrl += `S.expires_in=${encodeURIComponent(expires_in)};`
        // srcUrl += `end`;

        srcUrl=`http://shmood-mobile.com/${encodeURIComponent(access_token)}/${encodeURIComponent(refresh_token)}/${encodeURIComponent(expires_in)}`;

        console.log(srcUrl);
        return res.redirect(srcUrl);
      }else if(srcUrl.startsWith('shmood://')){
        // will do ios redirect later...
        console.log('ios redirect not implemented!');
      }else{
        srcUrl = urljoin(srcUrl, 'home', '#');
      }

      /* Redirecting back from whence we came! :-) */
      res.redirect(`${srcUrl}` +
      querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: expires_in,
      }));    
    }) 
    .catch((err) => {
      console.log(err);
      res.status(err.code);
      res.send(err.message);
    });
});

router.post('/refresh_token', function (req, res) {

  const {accessToken, refreshToken } = req.body;
  console.log(req.body)
  spotify.setAccessToken(accessToken);
  spotify.setRefreshToken(refreshToken);

  spotify
    .refreshAccessToken()
    .then(data => {
      console.log('token has been refreshed!');
      console.log(data.body);
      spotify.setAccessToken(data.body['access_token']);

      // send new token back?
      res.send(data.body);
    })
    .catch(err => {
      console.log('Could not refresh access token',err);
      res.status(400).send(err);
    })
});

router.get('/get-credentials', function(req, res) {

  // TODO: should update to check if this request is being made from a
  //  trusted source (ex: heroku)
  res.json(credentials);
});

module.exports = router;