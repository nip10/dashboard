require('dotenv').config();
const request = require('request');

const weatherApiKey = process.env.WU_API_KEY;

const stationId = 'pws:IPORTUGA71';
const locationCountry = 'Portugal';
const locationCity = 'Porto';

const weather = {
  apiUrls: {
    conditions: `http://api.wunderground.com/api/${weatherApiKey}/conditions/q/${stationId}.json`,
    forecast: `http://api.wunderground.com/api/${weatherApiKey}/forecast/q/${locationCountry}/${locationCity}.json`,
  },
  getConditions() {
    return new Promise((resolve, reject) => {
      request({
        url: this.apiUrls.conditions,
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
  getForecast() {
    return new Promise((resolve, reject) => {
      request({
        url: this.apiUrls.forecast,
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

module.exports = weather;
