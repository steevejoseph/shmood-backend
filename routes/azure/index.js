const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const urljoin = require('url-join');
const request = require('request');
const _ = require('lodash');

const AZURE_KEY = process.env.AZURE_KEY;
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

// Request parameters.
const params = {
  'returnFaceId': 'true',
  'returnFaceLandmarks': 'false',
  'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
      'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

router.post('/submit', (req, res, next) => {
  let imageUrl = req.body.imageUrl;

  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : AZURE_KEY
    }
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      res.send(err);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    // res.send(jsonResponse);

    const emotion = analyze(jsonResponse);

    if(emotion.error){
      res.status(400).send(emotion);
    }else{
      res.send(emotion);
    }
  });
});


const analyze = (facesArray) => {

  facesArray = JSON.parse(facesArray);
  if(facesArray.length < 1){
    return {
      error: 'No faces detected. :(',
    }
  }

  // make arr of emotion objects
  let moods = _.map(facesArray, (face) => face.faceAttributes.emotion);

  // intermed values, an array of objects with
  // the max emotion and its corresponding value for
  // each face.
  let intermed = [];
  let argmax = null;

  for(let i = 0; i < moods.length; i++){
    let curFace = moods[i];

    arr = Object.keys(curFace).reduce((max, cur) => {

      if(curFace[max] > curFace[cur]){
        return max;
      }else{
       return cur;
      }
    });
    intermed.push({emotion: arr, degree: moods[i][arr]});
  }

  // console.log(intermed);

  // return the final emotion
  let fin = intermed.reduce((max, cur) =>{
    return max.degree > cur.degree ? max: cur;
  });

  console.log(fin);
  return fin;
}



module.exports = router;
