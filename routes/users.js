const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/update-user-location', async (req, res) => {
  const { spotifyId, lat, lng } = req.body;

  const user = await User.findOne({ spotifyId });
  if (user) {
    user.location = { lat, lng };
    await user.save();
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});

module.exports = router;
