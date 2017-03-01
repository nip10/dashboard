const TvShows = require('../models/tvshows');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  TvShows.getTvShows(req.user.id, req.cookies.userSettings)
    .then((tv) => {
      res.status(200).send(tv);
    });
});

module.exports = router;
