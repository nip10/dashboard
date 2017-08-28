require('dotenv').config();

import rp from 'request-promise';
import moment from 'moment';

const Weather = {
  apiKey: process.env.WU_API_KEY,

  getCoordinates(country, city) {
    const options = {
      uri: `http://maps.google.com/maps/api/geocode/json?address=${city}+${country}`,
      json: true,
    };
    return rp(options)
        .then((res) => {
          const location = {
            lat: res.results[0].geometry.location.lat,
            lng: res.results[0].geometry.location.lng,
          };
          return location;
        })
        .catch(err => console.log(err));
  },

  getConditions(lat, lng) {
    const options = {
      uri: `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${lat},${lng}.json`,
      json: true,
    };
    return rp(options)
        .then((res) => {
          const baseObj = res.current_observation;
          const conditions = {
            location: baseObj.display_location.full,
            temperature: baseObj.temp_c,
            humidity: baseObj.relative_humidity,
            description: baseObj.weather,
            icon: (moment().format('HH') > 7 && moment().format('HH') < 20) ? baseObj.icon : `nt_${baseObj.icon}`,
            localtime: baseObj.local_time_rfc822,
            lastupdate: baseObj.observation_time_rfc822,
          };
          return conditions;
        })
        .catch(err => console.log(err));
  },

  getForecast(lat, lng) {
    const options = {
      uri: `http://api.wunderground.com/api/${this.apiKey}/forecast/q/${lat},${lng}.json`,
      json: true,
    };
    return rp(options)
      .then(res => res.forecast.simpleforecast)
      .catch(err => console.log(err));
  },
};

module.exports = Weather;
