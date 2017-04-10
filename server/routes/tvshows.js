import express from 'express';

import TvShows from '../models/tvshows';

const router = express.Router();

router.get('/', (req, res) => {
  const userSettingsTvshows = JSON.parse(req.cookies.userSettings.tvshows.shows);
  if (!userSettingsTvshows || userSettingsTvshows.length === 0 || userSettingsTvshows === 'null') {
    res.status(400).send({ error: 'You need to set at least one tvshow to fetch the episodes list.' });
  } else {
    TvShows.getTvShows(userSettingsTvshows)
      .then((tv) => {
        res.status(200).send(tv);
      })
      .catch((err) => {
        res.status(500).json({ status: err });
      });
  }
});

module.exports = router;
