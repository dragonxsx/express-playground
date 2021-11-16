const express = require('express');
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

const router = express.Router();

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (err, response, bodyData) =>  {
    const parsedData = JSON.parse(bodyData);
    res.render('index', {
      parsedData: parsedData.results
    });
  });
});

router.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const movieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  
  request(movieUrl, (err, response, bodyData) => {
    const parsedData = JSON.parse(bodyData);

    res.render('single-movie', {
      parsedData
    })
  })
});

router.post('/search', (req, res, next) => {
  const cat = req.body.cat;
  const searchString = req.body.movieSearch;
  const searchUrl = `${apiBaseUrl}/search/${cat}?query=${encodeURI(searchString)}&api_key=${apiKey}`;

  request(searchUrl, (err, response, bodyData) => {
    const parsedData = JSON.parse(bodyData);

    if(cat === "person") {
      parsedData.results = parsedData.results[0].known_for;
    }

    res.render('index', {
      parsedData: parsedData.results
    });
  });
});

module.exports = router;
