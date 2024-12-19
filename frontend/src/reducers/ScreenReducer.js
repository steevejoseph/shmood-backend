import { SCREEN_SELECTED, PLAYLIST_CATEGORY_SELECTED } from '../actions/types';

const INITIAL_STATE = {
  selectedScreen: 'home',
  selectedPlaylistCategory: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCREEN_SELECTED:
      return { ...state, selectedScreen: action.payload };
    case PLAYLIST_CATEGORY_SELECTED:
      return { ...state, selectedPlaylistCategory: action.payload };
    default:
      return state;
  }
};
