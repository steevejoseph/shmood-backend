const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,

  photos: {
    type: [String],
    default: [],
  },

  password: String,

});

module.exports = mongoose.model('User', userSchema);