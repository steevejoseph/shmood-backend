import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getSpotifyCredentials = () => {
  axios
    .get(`${API_URL}/spotify/auth/get-credentials`)
    .then(res => res.data)
    .catch(err => console.log('Error fetching credentials', err));
};

export const refreshTokens = () => {
  axios
    .post(`${API_URL}/spotify/auth/refresh_token`, {
      accessToken: getUserData('spotifyAccessToken'),
      refreshToken: getUserData('spotifyRefreshToken'),
    })
    .then(res => {
      const { access_token: accessToken, expires_in: expiresIn } = res.data;
      const spotifyTokenExpirationTime = `${new Date().getTime() + expiresIn * 1000}`;
      console.log('data:', res.data);
      setUserData('spotifyAccessToken', accessToken);
      setUserData('spotifyTokenExpirationTime', spotifyTokenExpirationTime);
      console.log('Successful token refresh!');
    })
    .catch(err => console.log('Cannot refresh', err));
};

export const refreshTokensIfExpired = () => {
  if (`${new Date().getTime()}` > getUserData('spotifyTokenExpirationTime')) refreshTokens();
};

export const setUserData = (key, value) => {
  localStorage.setItem(key, value);
  // console.log(`${key}:${value} is in localStorage!`);
};

export const getUserData = key => {
  const value = localStorage.getItem(key);
  // console.log(`${key}:${value} received from localStorage!`);
  return value;
};

// returns access token if on initial login.
export const checkInitialLogin = () => {
  const params = getHashParams();

  if (params.access_token) {
    setUserData('spotifyAccessToken', params.access_token);
    setUserData('spotifyRefreshToken', params.refresh_token);
    const spotifyTokenExpirationTime = `${new Date().getTime() + params.expires_in * 1000}`;
    setUserData('spotifyTokenExpirationTime', spotifyTokenExpirationTime);
    // console.log(`Bearer ${params.access_token}`);
    return params.access_token;
  }

  return null;
};

export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;

  const q = window.location.hash.substring(1);
  // eslint-disable-next-line no-cond-assign
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
