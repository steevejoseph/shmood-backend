const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type: String, default:''},
  lastName: {type: String, default:''},
  email: {type: String, default:''},
  username: {type: String, default:''},
  photos: {
    type:[{}],
    default:[],
  },
  password:{type: String, default:''},
});

module.exports = mongoose.model('User', userSchema);