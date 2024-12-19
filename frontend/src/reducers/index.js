import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import ScreenReducer from './ScreenReducer';
import PhotoReducer from './PhotoReducer';
import PlaylistReducer from './PlaylistReducer';

export default history =>
  combineReducers({
    form: formReducer,
    photo: PhotoReducer,
    playlist: PlaylistReducer,
    router: connectRouter(history),
    screen: ScreenReducer,
  });
