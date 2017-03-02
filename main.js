const request = require('request');
const util = require('util');

const url = 'http://api.wunderground.com/api/071e0ea1a158c3ed/forecast/q/dwadawd/Porto.json';

request({
  url,
}, (error, response, body) => {
  if (response.statusCode === 200 && !error) {
    const bodyJSON = JSON.parse(body);
    console.log(util.inspect(bodyJSON, false, null));
  } else {
    console.log('Error');
  }
});

// check if there is current_observation
// if the Country is wrong, but the City is right, we get sugestions from the api