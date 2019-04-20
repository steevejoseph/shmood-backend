import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Home, Landing, ListeningWithYou, PlaylistShow } from './pages';
import NewPlaylistForm from './forms/NewPlaylist';

export const history = createBrowserHistory({});

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/listening-with-you" component={ListeningWithYou} />
          <Route path="/playlist/new" component={NewPlaylistForm} />
          <Route path="/playlist/:id" component={PlaylistShow} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    );
  }
}
