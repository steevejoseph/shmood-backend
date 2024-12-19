import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import ScreenReducer from "./ScreenReducer";
import PhotoReducer from "./PhotoReducer";
import PlaylistReducer from "./PlaylistReducer";

const createRootReducer = () =>
  combineReducers({
    form: formReducer,
    photo: PhotoReducer,
    playlist: PlaylistReducer,
    screen: ScreenReducer,
  });

export default createRootReducer;
