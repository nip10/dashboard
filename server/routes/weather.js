const { Weather } = require('../models/weather');
const express = require('express');
const router = express.Router();

// Conditions
router.get('/conditions', (req, res) => {
  Weather.getConditions().then((conditions) => {
    res.status(200).send({
      location: conditions.current_observation.display_location.full,
      temperature: conditions.current_observation.temp_c,
      humidity: conditions.current_observation.relative_humidity,
      description: conditions.current_observation.weather,
      icon: conditions.current_observation.icon,
      localtime: conditions.current_observation.local_time_rfc822,
      lastupdate: conditions.current_observation.observation_time_rfc822,
    });
  });
});

// Forecast
router.get('/forecast', (req, res) => {
  Weather.getForecast().then((forecast) => {
    res.status(200).send(forecast);
  });
});

module.exports = router;
