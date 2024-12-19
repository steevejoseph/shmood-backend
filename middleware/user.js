/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const User = require('../models/user');

const sendIntroEmail = async (email) => {
  // Sends a welcome email after user signs up
  nodemailer.createTestAccount((createAccountError, account) => {
    if (createAccountError) {
      console.log(createAccountError);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      service: 'gmail',
      auth: {
        user: process.env.SHMOOD_EMAIL_USER,
        pass: process.env.SHMOOD_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Your new favorite music curator app" <shmoodapp@gmail.com>',
      to: email,
      subject: 'Thanks for using shmood! :)',
      html: `<h1>Hi there!</h1>
             <p>Thank you for trying out shmood, I hope you like it!
                If you run into issues, have questions, or would like to contribute,
                feel free to contact me (Steeve) at steevejoseph@knights.ucf.edu
             </p>
            `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }

      console.log('Message send: %s', info.messageId);
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
};

/**
 * Adds a Spotify user to the DB if not already present, or updates the user info if the user exists.
 * @param {Object} spotifyUser An object representing the Spotify user
 * @
 * @returns {boolean} Returns whether the user was already in the DB.
 */
exports.addUserToDb = async (spotifyUser) => {
  const { display_name, email, id } = spotifyUser.body;
  const user = await User.findOne({ spotifyId: id });
  // console.log(user);
  if (user) {
    user.spotifyId = id;
    user.loggedIn = true;
    user.lastLogin = Date.now();
    await user.save();
    return true;
  }

  const newUser = await new User({
    name: display_name,
    email,
    spotifyId: id,
    loggedIn: true,
    lastLogin: Date.now(),
  });

  sendIntroEmail(newUser.email);
  await newUser.save();
  return false;
};

exports.augmentUserPlaylistPhotos = async (spotifyId, photo) => {
  const user = await User.findOne({ spotifyId });

  if (user) {
    user.playlistPhoto.push(photo);
  } else {
    console.log('yeet, how u gonna add a photo if u not a user?');
  }
};
