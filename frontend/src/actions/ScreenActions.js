/* eslint-disable import/prefer-default-export */
import { SCREEN_SELECTED, PLAYLIST_CATEGORY_SELECTED } from './types';

export const selectScreen = screen => ({
  type: SCREEN_SELECTED,
  payload: screen,
});

export const selectPlaylistCategory = category => ({
  type: PLAYLIST_CATEGORY_SELECTED,
  payload: category,
});
