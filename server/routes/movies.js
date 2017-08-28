import express from 'express';

import Helpers from '../auth/_helpers';

import Movies from '../controllers/movies';

const router = express.Router();

router.get('/', Helpers.isLoggedIn, (req, res) => {
  Movies.getMovies()
    .then(movies => res.send(movies))
    .catch(err => res.status(500).send({ status: err }));
});

module.exports = router;
