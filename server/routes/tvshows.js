import express from 'express';

import Helpers from '../auth/_helpers';

import TvShows from '../controllers/tvshows';

const router = express.Router();

router.get('/', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;

  // TODO
  
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
