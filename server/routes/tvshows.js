const TvShows = require('../models/tvshows');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const userSettingsTvshows = req.cookies.userSettings.tvshows;
  if (!userSettingsTvshows || userSettingsTvshows.length === 0 || userSettingsTvshows === 'null') {
    res.status(400).send({ error: 'You need to set at least one tvshow to fetch the episodes list.' });
  } else {
    TvShows.getTvShows(req.cookies.userSettings.tvshows)
      .then((tv) => {
        res.status(200).send(tv);
      })
      .catch((err) => {
        res.status(500).json({ status: err });
      });
  }
});

module.exports = router;
