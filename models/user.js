const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  spotifyId: { type: String, default: '' },
  location: {
    lat: { type: String, default: '' },
    lng: { type: String, default: '' },
  },
  loggedIn: { type: Boolean, default: false },
  lastLogin: { type: Date, default: null },

  // each photo should have a link and a name referencing
  // its playlist
  playlistPhotos: {
    type: [{}],
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
