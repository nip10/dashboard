require('dotenv').config();
const knex = require('../db/connection');
const moment = require('moment');

const user = require('./user');

const startInterval = moment().subtract(21, 'days').format('YYYY-MM-DD'); // correct value is 2
const endInterval = moment().add(-10, 'days').format('YYYY-MM-DD');

const tvShows = {
  getTvShows(userID) {
    return new Promise((resolve, reject) => {
      user.getUserSettings(userID).then((userSettings) => {
        knex('tvshows')
                .whereIn('tvshow', userSettings.tvshows)
                .whereBetween('airdate', [startInterval, endInterval])
                .orderBy('airdate', 'asc')
                .then((result) => {
                  result.forEach((element) => {
                    element.airdate = moment(element.airdate).format('DD-MM-YYYY');
                  });
                  const tvShowsArray = result.reduce((acc, { tvshow, season, episode, airdate }) => {
                    acc.i += acc.airdate !== airdate;
                    acc.airdate = airdate;
                    acc.obj[`day${acc.i}`] = (acc.obj[`day${acc.i}`] || []).concat(`${tvshow} S${(`0${season}`).slice(-2)}E${(`0${episode}`).slice(-2)}`);
                    return acc;
                  }, { i: 0, obj: {} }).obj;
                  resolve(tvShowsArray);
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
      });
    });
  },
};

module.exports = tvShows;
