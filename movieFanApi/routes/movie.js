var express = require('express');
var router = express.Router();

const movies = require('../data/movies');

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

module.exports = router;
