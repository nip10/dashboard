require('dotenv').config();
const rp = require('request-promise');
const Promise = require('bluebird');
const moment = require('moment');

const Weather = {
  apiKey: process.env.WU_API_KEY,

  getConditions(country, city) {
    const options = {
      uri: `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${country}/${city}.json`,
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
          return resolve(conditions);
        })
        .catch(err => reject(err));
    });
  },

  getForecast(country, city) {
    const options = {
      uri: `http://api.wunderground.com/api/${this.apiKey}/forecast/q/${country}/${city}.json`,
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
