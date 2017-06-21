require('dotenv').config();

import moment from 'moment';
import knex from '../db/connection';

// const startInterval = moment().subtract(2, 'days').format('YYYY-MM-DD');
const startInterval = '2017-02-01';
// const endInterval = moment().add(2, 'days').format('YYYY-MM-DD');
const endInterval = '2017-02-06';

const TvShows = {
  getTvShows(tvshows) {
    return knex('tvshows')
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
          return tvShowsArray;
        })
        .catch((err) => {
          console.log(err);
        });
  },
};

module.exports = TvShows;
