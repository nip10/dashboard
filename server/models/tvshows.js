require('dotenv').config();
const knex = require('../db/connection');
const moment = require('moment');
const Promise = require('bluebird');

const startInterval = moment().subtract(90, 'days').format('YYYY-MM-DD'); // correct value is 2
const endInterval = moment().add(2, 'days').format('YYYY-MM-DD');

const TvShows = {
  getTvShows(tvshows) {
    return new Promise((resolve, reject) => {
      knex('tvshows')
        .whereIn('show', tvshows)
        .whereBetween('airdate', [startInterval, endInterval])
        .orderBy('airdate', 'asc')
        .then((result) => {
          result.forEach((element) => {
            element.airdate = moment(element.airdate).format('DD-MM-YYYY');
          });
          const tvShowsArray = result.reduce((acc, { show, season, episode, airdate }) => {
            acc.i += acc.airdate !== airdate;
            acc.airdate = airdate;
            acc.obj[`day${acc.i}`] = (acc.obj[`day${acc.i}`] || []).concat(`${show} S${(`0${season}`).slice(-2)}E${(`0${episode}`).slice(-2)}`);
            return acc;
          }, { i: 0, obj: {} }).obj;
          resolve(tvShowsArray);
        })
        .catch((err) => {
          reject('Error fetching tvshows');
        });
    });
  },
};

module.exports = TvShows;
