import express from 'express';
import Promise from 'bluebird';

import Utils from '../utils/utils';
import Helpers from '../auth/_helpers';

import TvShows from '../controllers/tvshows';
import Movies from '../controllers/movies';
import Weather from '../controllers/weather';
import User from '../controllers/user';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Dashboard - Index',
  });
});

router.get('/dashboard', Helpers.isLoggedIn, (req, res) => {
  User.getUserSettings(req.user)
    .then(([weatherSettings, TvShowsSettings]) => {
      const tvshows = TvShowsSettings.map(tvshow => tvshow.name);
      const weather = weatherSettings[0];
      const promises = [
        TvShows.getTvShows(tvshows),
        Movies.getMovies(),
        Weather.getConditions(weather.lat, weather.lng),
        Weather.getForecast(weather.lat, weather.lng),
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
              username: 'foo bar',
            },
            tv: {
              days: Utils.getListOfFiveDays(5, -2, 'D MMM'),
              list: tvList,
              settings: tvshows,
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
          res.render('error', {
            title: 'Dashboard',
            message: 'Server error. Please try again later',
            error: err,
          });
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;
