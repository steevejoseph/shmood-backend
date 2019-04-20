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
if(!fs.existsSync(imgdir)){
  fs.mkdirSync(imgdir);
}

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgdir);
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload =  multer({storage: storage});

// routes
router.post('/upload', upload.single('photo'), (req, res, next) =>{

  console.log('hit upload route');

  const file = req.file.path;
  imgur
    .uploadFile(file)
    .then(json => {
      const {deletehash, link} = json.data;
      console.log(json);
      res.json({
        deletehash,
        link
      });
    })
    .catch(err =>{
      console.log('Cannot add photo', err);
      res.status(500).json({
        message: 'Could not add photo',
        err: err
      })
    })

});

module.exports = router;