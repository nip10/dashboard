const express = require('express');

const days = require('../helpers/days');
const TvShows = require('../models/tvshows');
const Movies = require('../models/movies');
const Weather = require('../models/weather');

const util = require('util');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'index',
  });
});

router.get('/dashboard', (req, res) => {
  const userSettings = req.cookies.userSettings;
  if (!userSettings || userSettings.lenght === 0 || userSettings === 'null') {
    // try to read user settings from file (more on this on tasks.todo)
    return res.status(400).send({ status: 'User settings not found. Make sure you didnt clean the browser cookies and re-login.' });
  }
  return Promise.all([
    TvShows.getTvShows(userSettings.tvshows),
    Movies.getMovies(),
    Weather.getConditions(userSettings.weather.location.country, userSettings.weather.location.city),
    Weather.getForecast(userSettings.weather.location.country, userSettings.weather.location.city),
  ])
  .then(([tvList, moviesList, weatherConditions, weatherForecast]) => {
    console.log(util.inspect(tvList, false, null));
    res.render('dashboard', {
      title: 'Dashboard',
      tv: {
        days: days.getListOfFive(5, -2, 'D MMM'),
        list: tvList,
      },
      weather: {
        days: days.getListOfFive(4, 0, 'ddd, D MMM'),
        conditions: weatherConditions,
        forecast: weatherForecast,
      },
      movies: {
        list: moviesList,
      },
    });
  })
  .catch((err) => {
    return res.status(500).send({ status: err });
  });
});

module.exports = router;
