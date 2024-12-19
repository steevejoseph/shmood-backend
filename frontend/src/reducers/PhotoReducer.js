import {
  IMGUR_PHOTO_ADD_SUCCESS,
  SUBMIT_PHOTO_URL,
  SUBMIT_PHOTO_URL_SUCCESS,
  SUBMIT_PHOTO_URL_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  photoBeingSubmitted: false,
  photoAnalysis: null,
  imgurPhoto: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMGUR_PHOTO_ADD_SUCCESS:
      return { ...state, imgurPhoto: action.payload };
    case SUBMIT_PHOTO_URL:
      return { ...state, photoBeingSubmitted: true };
    case SUBMIT_PHOTO_URL_SUCCESS:
      return { ...state, photoBeingSubmitted: false, photoAnalysis: action.payload };
    case SUBMIT_PHOTO_URL_FAIL:
      return { ...state, photoBeingSubmitted: false };
    default:
      return state;
  }
};
