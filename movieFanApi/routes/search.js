var express = require('express');
var router = express.Router();

const movies = require('../data/movies');
const people = require('../data/people');

function queryRequired (req, res, next) {
 const searchTerm = req.query.query;
 if(!searchTerm) {
   return res.json({msg: "Query is required"});
 }
 next();
}

router.use(queryRequired);

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Search' });
});

// GET /movie
router.get('/movie', function(req, res, next){
  const searchTerm = req.query.query;
  const results = movies.filter(movie => {
    return movie.title.includes(searchTerm) || movie.overview.includes(searchTerm);
  });

  res.json({results});
});

// GET /people
router.get('/person', function(req, res, next){
  const searchTerm = req.query.query;
  const results = people.filter(person => {
    return person.name.includes(searchTerm);
  });

  res.json({results});
});

module.exports = router;
