require('dotenv').config();
const request = require('request');

const Weather = {
  apiKey: process.env.WU_API_KEY,

  getConditions(country, city) {
    const url = `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${country}/${city}.json`;
    return new Promise((resolve, reject) => {
      request({
        url,
      }, (error, response, body) => {
        if (response.statusCode === 200 && !error) {
          const bodyJSON = JSON.parse(body);
          if (!bodyJSON.current_observation) {
            return reject('Invalid response from the WU API (conditions)');
          }
          return resolve(bodyJSON);
        }
        return reject(error);
      });
    });
  },

  getForecast(country, city) {
    const url = `http://api.wunderground.com/api/${this.apiKey}/forecast/q/${country}/${city}.json`;
    return new Promise((resolve, reject) => {
      request({
        url,
      }, (error, response, body) => {
        if (response.statusCode === 200 && !error) {
          const bodyJSON = JSON.parse(body);
          if (!bodyJSON.forecast) {
            return reject('Invalid response from the WU API (forecast)');
          }
          return resolve(bodyJSON.forecast.simpleforecast);
        }
        return reject(error);
      });
    });
  },
};

module.exports = Weather;
