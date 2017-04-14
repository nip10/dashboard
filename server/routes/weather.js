import express from 'express';

import Weather from '../models/weather';

const router = express.Router();

router.get('/conditions', (req, res) => {

  const userSettings = JSON.parse(req.cookies.userSettings);

  const location = {
    lat: userSettings.weather.location.lat,
    lng: userSettings.weather.location.lng,
  };

  if (!location.lat || location.lat.length === 0 || location.lat === 'null') {
    res.status(400).send({ error: 'You need to set a County to get the Weather.' });
  } else if (!location.lng || location.lng.length === 0 || location.lng === 'null') {
    res.status(400).send({ error: 'You need to set a City to get the Weather.' });
  } else {
    Weather.getConditions(location.lat, location.lng)
      .then((conditions) => {
        res.status(200).send({
          location: conditions.location,
          temperature: conditions.temperature,
          humidity: conditions.humidity,
          description: conditions.description,
          icon: conditions.icon,
          localtime: conditions.localtime,
          lastupdate: conditions.lastupdate,
        });
      })
      .catch((err) => {
        res.status(500).json({ status: err });
      });
  }
});

router.get('/forecast', (req, res) => {

  const userSettings = JSON.parse(req.cookies.userSettings);

  const location = {
    lat: userSettings.weather.location.lat,
    lng: userSettings.weather.location.lng,
  };

  if (!location.lat || location.lat.length === 0 || location.lat === 'null') {
    res.status(400).send({ error: 'You need to set a County to get the Weather.' });
  } else if (!location.lng || location.lng.length === 0 || location.lng === 'null') {
    res.status(400).send({ error: 'You need to set a City to get the Weather.' });
  } else {
    Weather.getForecast(location.lat, location.lng)
      .then((forecast) => {
        res.status(200).send(forecast);
      })
      .catch((err) => {
        res.status(500).json({ status: err });
      });
  }
});

module.exports = router;
