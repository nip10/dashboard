const Weather = require('../models/weather');
const express = require('express');

const router = express.Router();

// Conditions
router.get('/conditions', (req, res) => {
  const locationCountry = req.cookies.userSettings.weather.location.country;
  const locationCity = req.cookies.userSettings.weather.location.city;

  Weather.getConditions(req.user.id, locationCountry, locationCity)
    .then((conditions) => {
      const baseObj = conditions.current_observation;
      res.status(200).send({
        location: baseObj.display_location.full,
        temperature: baseObj.temp_c,
        humidity: baseObj.relative_humidity,
        description: baseObj.weather,
        icon: baseObj.icon,
        localtime: baseObj.local_time_rfc822,
        lastupdate: baseObj.observation_time_rfc822,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Forecast
router.get('/forecast', (req, res) => {
  const locationCountry = req.cookies.userSettings.weather.location.country;
  const locationCity = req.cookies.userSettings.weather.location.city;

  Weather.getForecast(req.user.id, locationCountry, locationCity)
    .then((forecast) => {
      res.status(200).send(forecast);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
