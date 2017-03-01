require('dotenv').config();
const request = require('request');

const Weather = {
  apiKey: process.env.WU_API_KEY,

  getConditions(userID, country, city) {
    const url = `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${country}/${city}.json`;
    return new Promise((resolve, reject) => {
      request({
        url,
      }, (error, response, body) => {
        if (response.statusCode === 200 && !error) {
          const bodyJSON = JSON.parse(body);
          resolve(bodyJSON);
        } else {
          reject('Erro');
        }
      });
    });
  },

  getForecast(userID, country, city) {
    const url = `http://api.wunderground.com/api/${this.apiKey}/forecast/q/${country}/${city}.json`;
    return new Promise((resolve, reject) => {
      request({
        url,
      }, (error, response, body) => {
        if (response.statusCode === 200 && !error) {
          const bodyJSON = JSON.parse(body);
          resolve(bodyJSON.forecast.simpleforecast);
        } else {
          reject('Erro');
        }
      });
    });
  },
};

module.exports = Weather;
