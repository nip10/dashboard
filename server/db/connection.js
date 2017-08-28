const environment = process.env.NODE_ENV;
console.log('current env: ', environment);
const config = require('./knexfile.js')[environment];

module.exports = require('knex')(config);
