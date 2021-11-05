const express = require('express');
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (err, response, bodyData) =>  {
    console.log('============Error============');
    console.log(err);
    console.log('============Body============');
    console.log(bodyData);
    console.log('============Request============');
    console.log(res);

    res.json(JSON.parse(bodyData));
  });

 
  // res.render('index', {});
});

module.exports = router;
