import React from 'react';
import SpotifyAuth from './SpotifyAuth';

import livemusic from '../../assets/vid/livemusic.mp4';

const Landing = () => (
  <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        top: 0,
        left: 0,
      }}
    >
      <source src={livemusic} type="video/mp4" />
    </video>
    <SpotifyAuth />
  </div>
);

export default Landing;
