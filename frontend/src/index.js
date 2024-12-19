import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import { createMiddleware } from 'redux-beacon';
import Segment, { trackPageView } from '@redux-beacon/segment';
import { routerMiddleware, LOCATION_CHANGE } from 'connected-react-router';

import {} from 'dotenv/config';

import creatRootReducer from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';

import App, { history } from './components/App';

const eventsMap = {
  [LOCATION_CHANGE]: trackPageView(action => ({
    page: action.payload.pathname,
  })),
};

const seg = Segment();
const segmentMiddleware = createMiddleware(eventsMap, seg);

// https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const c = composeEnhancers(applyMiddleware(ReduxThunk, routerMiddleware(history), segmentMiddleware));
const store = createStore(creatRootReducer(history), {}, c);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
