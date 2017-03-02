const Movies = require('../models/movies');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  Movies.getMovies()
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => {
      res.status(500).json({ status: err });
    });
});

module.exports = router;
