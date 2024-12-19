import {
  PLAYLIST_GENERATION_STARTED,
  PLAYLIST_GENERATION_SUCCESS,
  PLAYLIST_GENERATION_FAIL,
  PLAYLIST_PHOTO_ADD_STARTED,
  PLAYLIST_PHOTO_ADD_SUCCESS,
  PLAYLIST_PHOTO_ADD_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLIST_GENERATION_STARTED:
      console.log('In the reducer for PGS!');
      return { ...state, loading: true };
    case PLAYLIST_GENERATION_SUCCESS:
      console.log('In the reducer for PGSucc');
      return { ...state, loading: false };
    case PLAYLIST_GENERATION_FAIL:
      console.log('In the reducer for PGF!');
      return { ...state, loading: false };
    case PLAYLIST_PHOTO_ADD_STARTED:
      console.log('In the reducer for PPAS!');
      return { ...state, loading: true };
    case PLAYLIST_PHOTO_ADD_SUCCESS:
      console.log('In the reducer for PPASucc!');
      return { ...state, loading: false };
    case PLAYLIST_PHOTO_ADD_FAIL:
      console.log('In the reducer for PPAF!');
      return { ...state, loading: false };
    default:
      return state;
  }
};
