var express = require('express');
var router = express.Router();

const movies = require('../data/movies');
const movieDetails = require('../data/movieDetails');

const requireJSON = (req, res, next) => {
  if(!req.is('application/json')) {
    res.status(400);
    return res.json({msg: 'The Content-Type must be application/json'});
  }
  next();
};

/* GET movie page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movie' });
});

router.get('/most_popular', function(req, res, next) {  
  let page = req.query.page;
  if(page === undefined) page = 1;

  let result = movies.filter(movie => movie.most_popular);
  let startIndex = (page - 1) * 10;
  result = result.slice(startIndex, startIndex + 9);

  res.json({
    page,
    results: result
  });
});

// GET /movie/top_rated
router.get('/top_rated', (req, res, next) =>  {
  let page = req.query.page;
  if(page === undefined) page = 1;

  let results = movieDetails
  .sort((movie1, movie2) => movie2.vote_average - movie1.vote_average);

  let startIndex = (page - 1) * 10;
  results =results.slice(startIndex, startIndex + 9);

  res.json({
    page: Number(page),
    results
  });
});

// GET /movie/:movieId
router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;

  const result = movieDetails.find(movie => movie.id == movieId);
  if(!result) {
    res.status(404); 
    return res.json({
      msg: 'MovieId is not found',
      production_companies: []
    });
  }

  res.json(result);
});

// GET /movie/:movieId/rating
router.post('/:movieId/rating', requireJSON, (req, res, next) => {
  const value = req.body.value;
  if(value < .5 || value > 10) {
    return res.json({ msg: "The value must be between 0.5 and 10" });
  }

  res.json({
    msg: "Rating done!",
    status_code: 200
  });
});

// DELETE /movie/:movieId/rating
router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
  res.json({
    msg: "Rating deleted!",
    status_code: 200
  });
});

module.exports = router;
