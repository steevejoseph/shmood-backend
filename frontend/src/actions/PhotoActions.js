/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import {
  IMGUR_PHOTO_ADD_PENDING,
  IMGUR_PHOTO_ADD_SUCCESS,
  IMGUR_PHOTO_ADD_FAIL,
  SUBMIT_PHOTO_URL,
  SUBMIT_PHOTO_URL_SUCCESS,
  SUBMIT_PHOTO_URL_FAIL,
} from './types';

import { history } from '../components/App';
import { createPlaylist } from './PlaylistActions';

const API_URL = process.env.REACT_APP_API_URL;

export const getImgurUrl = values => dispatch => {
  dispatch({ type: IMGUR_PHOTO_ADD_PENDING });
  const reader = new FileReader();
  reader.readAsDataURL(values.image[0]);

  reader.onabort = () => console.log('file reading was aborted');
  reader.onerror = () => console.log('file reading has failed');
  reader.onload = () => {
    // Do whatever you want with the file contents
    axios
      .post(`${API_URL}/imgur/upload`, { photo: reader.result })
      .then(res => {
        dispatch({
          type: IMGUR_PHOTO_ADD_SUCCESS,
          payload: res.data,
        });

        const imageUrl = res.data.link;
        const imageDeleteHash = res.data.deletehash;
        dispatch(submitPhotoUrl({ imageUrl, imageDeleteHash, ...values }));
      })
      .catch(err => {
        console.log('Could not upload to Imgur', err);
        dispatch({ type: IMGUR_PHOTO_ADD_FAIL });
        alert('Cannot upload image to Imgur, redirecting you to home page!');
        history.push('/home');
      });
  };
};

export const submitPhotoUrl = values => dispatch => {
  dispatch({
    type: SUBMIT_PHOTO_URL,
  });

  const { imageUrl } = values;

  // @feature should add in a check for what happens if there's no faces in picture.
  //  @response: ALERT! 😎
  axios
    .post(`${API_URL}/azure/submit`, { imageUrl })
    .then(res => {
      dispatch({
        type: SUBMIT_PHOTO_URL_SUCCESS,
        payload: res.data,
      });

      values.imageBinary = res.data.imageBinary;
      values.emotion = res.data.emotion;
      values.degree = res.data.degree;
      dispatch(createPlaylist(values));
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SUBMIT_PHOTO_URL_FAIL });
      alert('No faces detected in your image, redirecting you to home page!');
      history.push('/home');
    });
};
