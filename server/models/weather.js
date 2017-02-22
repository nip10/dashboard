require('dotenv').config();
const request = require('request');

const user = require('./user');

const weather = {
  api: {
    key: process.env.WU_API_KEY,
    getConditionsUrl(userID) {
      return new Promise((resolve, reject) => {
        user.getUserSettings(userID)
          .then((userSettings) => {
            const locationCountry = userSettings.weather.location.country;
            const locationCity = userSettings.weather.location.city;
            const url = `http://api.wunderground.com/api/${this.key}/conditions/q/${locationCountry}/${locationCity}.json`;
            resolve(url);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    getForecastUrl(userID) {
      return new Promise((resolve, reject) => {
        user.getUserSettings(userID)
          .then((userSettings) => {
            const locationCountry = userSettings.weather.location.country;
            const locationCity = userSettings.weather.location.city;
            const url = `http://api.wunderground.com/api/${this.key}/forecast/q/${locationCountry}/${locationCity}.json`;
            resolve(url);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
  },

  getConditions(userID) {
    return this.api.getConditionsUrl(userID)
      .then((url) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getForecast(userID) {
    return this.api.getForecastUrl(userID)
      .then((url) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = weather;
