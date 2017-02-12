require('dotenv').config();

const request = require('request');

const weatherApiKey = process.env.WU_API_KEY;

const stationId = 'pws:IPORTUGA71';
const locationCountry = 'Portugal';
const locationCity = 'Porto';

const Weather = {};

const conditionsUrl = `http://api.wunderground.com/api/${weatherApiKey}/conditions/q/${stationId}.json`;
const forecastUrl = `http://api.wunderground.com/api/${weatherApiKey}/forecast/q/${locationCountry}/${locationCity}.json`;

Weather.getConditions = () => new Promise((resolve, reject) => {
  request({
    url: conditionsUrl,
  }, (error, response, body) => {
    if (response.statusCode === 200 && !error) {
      const bodyJSON = JSON.parse(body);
      resolve(bodyJSON);
    } else {
      reject('Erro');
    }
  });
});

Weather.getForecast = () => new Promise((resolve, reject) => {
  request({
    url: forecastUrl,
  }, (error, response, body) => {
    if (response.statusCode === 200 && !error) {
      const bodyJSON = JSON.parse(body);
      resolve(bodyJSON.forecast.simpleforecast);
    } else {
      reject('Erro');
    }
  });
});

module.exports = { Weather };
