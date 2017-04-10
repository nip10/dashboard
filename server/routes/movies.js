import express from 'express';

import Movies from '../models/movies';

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
