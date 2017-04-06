require('dotenv').config();
const rp = require('request-promise');
const Promise = require('bluebird');
const moment = require('moment');

const Weather = {
  apiKey: process.env.WU_API_KEY,

  getCoordinates(country, city) {
    const options = {
      uri: `http://maps.google.com/maps/api/geocode/json?address=${city}+${country}`,
      json: true,
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then((res) => {
          const location = {
            lat: res.results.geometry.location.lat,
            lng: results.geometry.location.lat,
          }
          resolve(location);
        })
        .catch(err => reject(err));
    });
  },

  getConditions(lat, lng) {
    const options = {
      uri: `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${lat},${lng}.json`,
      json: true,
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then((res) => {
          const baseObj = res.current_observation;
          const conditions = {
            location: baseObj.display_location.full,
            temperature: baseObj.temp_c,
            humidity: baseObj.relative_humidity,
            description: baseObj.weather,
            icon: (moment().format('hh') < 7 || moment().format('hh') > 20) ? baseObj.icon : `nt_${baseObj.icon}`,
            localtime: baseObj.local_time_rfc822,
            lastupdate: baseObj.observation_time_rfc822,
          };
          resolve(conditions);
        })
        .catch(err => reject(err));
    });
  },

  getForecast(lat, lng) {
    const options = {
      uri: `http://api.wunderground.com/api/${this.apiKey}/forecast/q/${lat},${lng}.json`,
      json: true,
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then(res => resolve(res.forecast.simpleforecast))
        .catch(err => reject(err));
    });
  },
};

module.exports = Weather;
