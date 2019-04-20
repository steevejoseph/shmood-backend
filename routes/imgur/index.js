const express = require('express');

const router = express.Router();
const fs = require('fs');
const multer = require('multer');

// imgur set up
const imgur = require('imgur');

imgur.setClientId(process.env.IMGUR_CLIENT_ID);
imgur.setAPIUrl('https://api.imgur.com/3/');


// set up dir
const imgdir = './uploads';
if (!fs.existsSync(imgdir)) {
  fs.mkdirSync(imgdir);
}

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgdir);
  },

  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});
const upload = multer({ storage });

// routes
router.post('/upload', upload.single('photo'), (req, res) => {
  const file = req.file.path;
  imgur
    .uploadFile(file)
    .then((json) => {
      const { deletehash, link } = json.data;
      res.json({
        deletehash,
        link,
      });
    })
    .catch((err) => {
      console.log('Cannot add photo', err);
      res.status(500).json({
        message: 'Could not add photo',
        err,
      });
    });
});

// route for deleting an image
router.post('/delete', (req, res) => {
  const { deletehash } = req.body;

  imgur
    .deleteImage(deletehash)
    .then((status) => {
      console.log('Successfully deleted image', status);
      res.json(status);
    })
    .catch((err) => {
      console.log('Error deleting image', err);
      res.status(500).json({
        message: 'Could not delete image.',
        err,
      });
    });
});

module.exports = router;
