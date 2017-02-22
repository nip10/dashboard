const weather = require('../models/weather');
const express = require('express');

const router = express.Router();

// Conditions
router.get('/conditions', (req, res) => {
  weather.getConditions(req.user.id).then((conditions) => {
    res.status(200).send({
      location: conditions.current_observation.display_location.full,
      temperature: conditions.current_observation.temp_c,
      humidity: conditions.current_observation.relative_humidity,
      description: conditions.current_observation.weather,
      icon: conditions.current_observation.icon,
      localtime: conditions.current_observation.local_time_rfc822,
      lastupdate: conditions.current_observation.observation_time_rfc822,
    });
  })
    .catch((err) => {
      console.log(err);
    });
});

// Forecast
router.get('/forecast', (req, res) => {
  weather.getForecast(req.user.id).then((forecast) => {
    res.status(200).send(forecast);
  })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
