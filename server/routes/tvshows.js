const tvShows = require('../models/tvshows');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  tvShows.getTvShows(req.user.id)
    .then((tv) => {
      res.status(200).send(tv);
    });
});

module.exports = router;
