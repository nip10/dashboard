import express from 'express';
import Promise from 'bluebird';

import Utils from '../utils/utils';

import TvShows from '../models/tvshows';
import Movies from '../models/movies';
import Weather from '../models/weather';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Dashboard - Index',
  });
});

router.get('/dashboard', (req, res) => {
  const userSettings = JSON.parse(req.cookies.userSettings);
  if (!userSettings || userSettings.lenght === 0 || userSettings === 'null') {
    // try to read user settings from file (more on this on tasks.todo)
    // refactor this because i dont want to just send json
    // or catch the error on the front-end by looking up the 'status' var
    return res.status(400).send({ status: 'User settings not found. Please login again.' });
  }

  const promises = [
    TvShows.getTvShows(userSettings.tvshows.shows),
    Movies.getMovies(),
    Weather.getConditions(userSettings.weather.location.lat, userSettings.weather.location.lng),
    Weather.getForecast(userSettings.weather.location.lat, userSettings.weather.location.lng),
  ];

  return Promise.all(promises.map(promise => promise.reflect()))
    .then(([tvList, moviesList, weatherConditions, weatherForecast]) => {
      const errors = {};
      (!tvList.isFulfilled()) ? errors.tvList = true : tvList = tvList.value();
      (!moviesList.isFulfilled()) ? errors.moviesList = true : moviesList = moviesList.value();
      (!weatherConditions.isFulfilled()) ? errors.weatherConditions = true : weatherConditions = weatherConditions.value();
      (!weatherForecast.isFulfilled()) ? errors.weatherForecast = true : weatherForecast = weatherForecast.value();
      res.render('dashboard', {
        title: 'Dashboard - Main',
        user: {
          username: userSettings.username,
        },
        tv: {
          days: Utils.getListOfFiveDays(5, -2, 'D MMM'),
          list: tvList,
          settings: userSettings.tvshows.shows,
        },
        weather: {
          days: Utils.getListOfFiveDays(4, 0, 'ddd, D MMM'),
          conditions: weatherConditions,
          forecast: weatherForecast,
        },
        movies: {
          list: moviesList,
        },
        errors,
      });
    })
    .catch((err) => {
      console.log(err);
      // this means that (probably) the server crashed, render the error page with an alert
      // eg: 'Server is down. Please try again later.'
    });
});

module.exports = router;
