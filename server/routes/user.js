import express from 'express';

import Helpers from '../auth/_helpers';
import knex from '../db/connection';

import User from '../models/user';

const router = express.Router();

// Get all settings
router.get('/settings', Helpers.isLoggedIn, (req, res) => {
  Promise.all([p1, p2])
    .then(data => console.log(data))
    .catch(err => console.log(err));
  // Get Weather Settings
  const p1 = knex.select('lat', 'lng', 'city', 'country')
    .from('weather')
    .where('user_id', userID)
    // .then(location => res.send({ data: location }))
    // .catch(err => res.send({ error: err}))
  // Get TvShows
  const p2 = knex('tvshows')
    .join('usertv', 'usertv.user_id', '=', userID)
    .select('tvshows.name')
    .whereIn('tvshows.id', 'usertv.tvshow_id')
    // .then(tvshows => res.send({ data: tvshows }))
    // .catch(err => res.send({ error: err }));
});

// Weather settings - edit location and unit
router.put('/settings/weather', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;
  knex('weather')
    .where('user_id', userID)
    .update({ country: req.body.country, city: req.body.city, unit: req.body.unit })
    .then(() => res.send({ status: 'success' }))
    .catch(err => res.send({ error: err }));
});

// Language settings - edit language
router.put('/settings/language', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;
  knex('users')
    .where('id', userID)
    .update({ language: req.body.language })
    .then(() => res.send({ status: 'success' }))
    .catch(err => res.send({ error: err }));
});

// TVShows settings - get shows
router.get('/settings/tvshows', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;

  knex('tvshows')
    .join('usertv', 'usertv.user_id', '=', userID)
    .select('tvshows.name')
    .whereIn('tvshows.id', 'usertv.tvshow_id')
    .then(tvshows => res.send({ data: tvshows }))
    .catch(err => res.send({ error: err }));
});

// TVShows settings - add new show
// this way works assuming I have the tvShowId on the front-end
router.post('/settings/tvshows', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;
  const tvShowId = req.body.tvshowid;
  knex('usertv')
    .insert({ user_id: userID, tvshow_id: tvShowId })
    .then(() => res.send({ status: 'success' }))
    .catch(err => res.send({ error: err }));
});

// TVShows settings - delete show
// this way works assuming I have the tvShowId on the front-end
router.delete('/settings/tvshows', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;
  const tvShowId = req.body.tvshowid;
  knex('usertv')
    .where({ user_id: userID, tvshow_id: tvShowId })
    .del()
    .then(() => res.send({ status: 'success' }))
    .catch(err => res.send({ error: err }));
});

module.exports = router;
