const { Movies } = require('../models/movies');
const express = require('express');

const router = express.Router();

// Movies
router.get('/', (req, res) => {
  Movies.getMovies().then((movies) => {
    res.send(movies);
  });
});

module.exports = router;
