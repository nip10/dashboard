const TvShows = require('../models/tvshows');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  TvShows.getTvShows(req.cookies.userSettings)
    .then((tv) => {
      res.status(200).send(tv);
    })
    .catch((err) => {
      res.status(500).json({ status: err });
    });
});

module.exports = router;
