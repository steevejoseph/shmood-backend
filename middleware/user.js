const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const User = require('../models/user');

exports.addUserToDb = async (res) => {
  const { display_name, email, id } = res.body;
  const user = await User.findOne({ spotifyId: id });
  // console.log(user);
  if (user) {
    user.spotifyId = id;
    user.loggedIn = true;
    user.lastLogin = Date.now();
    await user.save();
  } else {
    await new User({
      name: display_name,
      email,
      spotifyId: id,
      loggedIn: true,
      lastLogin: Date.now(),
    }).save();
  }
};

exports.augmentUserPlaylistPhotos = async (spotifyId, photo) => {
  const user = await User.findOne({ spotifyId });

  if (user) {
    user.playlistPhoto.push(photo);
  } else {
    console.log('yeet, how u gonna add a photo if u not a user?');
  }
};
