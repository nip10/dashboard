require('../config/config');

const request = require('request');

const weatherApiKey = process.env.WU_API_KEY;

const stationId = 'pws:IPORTUGA71';
const locationCountry = 'Portugal';
const locationCity = 'Porto';

const Weather = {};

const conditionsUrl = 'http://api.wunderground.com/api/' + weatherApiKey + '/conditions/q/' + stationId + '.json';
const forecastUrl = 'http://api.wunderground.com/api/' + weatherApiKey + '/forecast/q/' + locationCountry + '/' + locationCity + '.json';

Weather.getConditions = () => {
    return new Promise ((resolve, reject) => {
        request({
            url: conditionsUrl,
        }, function (error, response, body) {
            if (response.statusCode === 200 && !error) {
                let bodyJSON = JSON.parse(body);
                console.log(bodyJSON);
                resolve(bodyJSON);
            } else {
                reject('Erro');
            }
        });
    });
}

Weather.getForecast = () => {
    return new Promise ((resolve, reject) => {
        request({
            url: forecastUrl,
        }, function (error, response, body) {
            if (response.statusCode === 200 && !error) {
                let bodyJSON = JSON.parse(body);
                console.log(bodyJSON);
                resolve(bodyJSON);
            } else {
                reject('Erro');
            }
        });
    });
}

module.exports = {Weather};
