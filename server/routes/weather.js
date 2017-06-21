import express from 'express';
import knex from '../db/connection';

import Helpers from '../auth/_helpers';

import Weather from '../models/weather';

const router = express.Router();

router.get('/conditions', Helpers.isLoggedIn, (req, res) => {

  const userID = req.user;
  knex.select('lat', 'lng')
    .from('weather')
    .where('user_id', userID)
    .then(location => console.log(location))
    .catch(err => console.log(err));

  if (!location.lat || location.lat.length === 0 || location.lat === 'null') {
    res.status(400).send({ error: 'You need to set a County to get the Weather.' });
  } else if (!location.lng || location.lng.length === 0 || location.lng === 'null') {
    res.status(400).send({ error: 'You need to set a City to get the Weather.' });
  } else {
    Weather.getConditions(location.lat, location.lng)
      .then(conditions => {
        res.send({
          location: conditions.location,
          temperature: conditions.temperature,
          humidity: conditions.humidity,
          description: conditions.description,
          icon: conditions.icon,
          localtime: conditions.localtime,
          lastupdate: conditions.lastupdate,
        });
      })
      .catch(err => res.status(500).send({ status: err }));
  }
});

router.get('/forecast', Helpers.isLoggedIn, (req, res) => {

  const userID = req.user;
  knex.select('lat', 'lng')
    .from('weather')
    .where('user_id', userID)
    .then(location => console.log(location))
    .catch(err => console.log(err));

  if (!location.lat || location.lat.length === 0 || location.lat === 'null') {
    res.status(400).send({ error: 'You need to set a County to get the Weather.' });
  } else if (!location.lng || location.lng.length === 0 || location.lng === 'null') {
    res.status(400).send({ error: 'You need to set a City to get the Weather.' });
  } else {
    Weather.getForecast(location.lat, location.lng)
      .then(forecast => res.send(forecast))
      .catch(err => res.status(500).send({ status: err }));
  }
});

module.exports = router;
