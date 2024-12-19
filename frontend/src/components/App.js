import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";

import { Home, Landing, ListeningWithYou, PlaylistShow } from "./pages";
import NewPlaylistForm from "./forms/NewPlaylist";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/listening-with-you" element={<ListeningWithYou />} />
        <Route path="/playlist/new" element={<NewPlaylistForm />} />
        <Route path="/playlist/:id" element={<PlaylistShow />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    );
  }
}
