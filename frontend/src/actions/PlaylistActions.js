/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import { getUserData, refreshTokensIfExpired, seeds } from '../assets/scripts/spotify';

import { history } from '../components/App';
import {
  PLAYLIST_GENERATION_STARTED,
  PLAYLIST_GENERATION_SUCCESS,
  PLAYLIST_GENERATION_FAIL,
  PLAYLIST_PHOTO_ADD_STARTED,
  PLAYLIST_PHOTO_ADD_SUCCESS,
  PLAYLIST_PHOTO_ADD_FAIL,
} from './types';

const spotify = new Spotify();

const validateToken = () => {
  refreshTokensIfExpired();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
};

// Creates and adds image to playlist.
export const createPlaylist = values => async dispatch => {
  validateToken();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
  const { name, imageUrl, imageBinary, emotion, degree } = values;

  dispatch({ type: PLAYLIST_GENERATION_STARTED });

  try {
    const me = await spotify.getMe();
    const newPlaylist = await spotify.createPlaylist(me.id, { name: `Shmood Presents: ${name}` });
    dispatch(addPhotoToPlaylist(newPlaylist.id, imageBinary));
    dispatch(fillPlaylist(newPlaylist.id, values));
    history.push(`/playlist/${newPlaylist.id}`);
  } catch (err) {
    console.log(err);
    dispatch({ type: PLAYLIST_GENERATION_FAIL });
    alert('Error creating playlist, redirecting you to home page!');
    history.push('/home');
  }
};

export const addPhotoToPlaylist = (playlistId, imageData) => async dispatch => {
  dispatch({ type: PLAYLIST_PHOTO_ADD_STARTED });

  try {
    await spotify.uploadCustomPlaylistCoverImage(playlistId, imageData);
    dispatch({ type: PLAYLIST_PHOTO_ADD_SUCCESS });
  } catch (err) {
    console.log('Cannot add photo to playlist', err);
    dispatch({ type: PLAYLIST_PHOTO_ADD_FAIL });
    alert('Error adding photo to playlist, redirecting you to home page!');
    history.push('/home');
  }
};

export const fillPlaylist = (playlistId, values) => async dispatch => {
  validateToken();
  const { emotion, degree } = values;
  const deg = degree > 0.5 ? 'high' : 'low';
  const options = seeds[emotion].degree[deg];

  try {
    const recommendations = await spotify.getRecommendations(options);
    const { tracks } = recommendations;
    const songs = tracks.map(track => track.uri);
    await spotify.addTracksToPlaylist(playlistId, songs);
    dispatch({ type: PLAYLIST_GENERATION_SUCCESS });
  } catch (err) {
    console.log('Cannot get recommendations', err);
    dispatch({ type: PLAYLIST_GENERATION_FAIL });
    alert('Error filling playlist, redirecting you to home page!');
    history.push('/home');
  }
};
