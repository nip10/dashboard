const Weather = require('../models/weather');
const express = require('express');

const router = express.Router();

router.get('/conditions', (req, res) => {
  const locationCountry = req.cookies.userSettings.weather.location.country;
  const locationCity = req.cookies.userSettings.weather.location.city;

  if (!locationCountry || locationCountry.length === 0 || locationCountry === 'null') {
    res.status(400).send({ error: 'You need to set a County to get the Weather.' });
  } else if (!locationCity || locationCity.length === 0 || locationCity === 'null') {
    res.status(400).send({ error: 'You need to set a City to get the Weather.' });
  } else {
    Weather.getConditions(locationCountry, locationCity)
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
  const locationCountry = req.cookies.userSettings.weather.location.country;
  const locationCity = req.cookies.userSettings.weather.location.city;

  if (!locationCountry || locationCountry.length === 0 || locationCountry === 'null') {
    res.status(400).send({ error: 'You need to set a County to get the Weather.' });
  } else if (!locationCity || locationCity.length === 0 || locationCity === 'null') {
    res.status(400).send({ error: 'You need to set a City to get the Weather.' });
  } else {
    Weather.getForecast(locationCountry, locationCity)
      .then((forecast) => {
        res.status(200).send(forecast);
      })
      .catch((err) => {
        res.status(500).json({ status: err });
      });
  }
});

module.exports = router;
