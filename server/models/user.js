const fs = require('fs');
const moment = require('moment');
const path = require('path');

const User = {

  userSettingsTemplate: {
    isNew: true,
    createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
    lastUpdate: null,
    language: null,
    username: null,
    tvshows: [],
    movies: {
      gender: [],
      rating: null,
      year: null,
    },
    email: {
      emailAddress: null,
      server: null,
      onlyUnread: true,
    },
    weather: {
      location: {
        country: null,
        city: null,
      },
      unit: null,
    },
  },

  userSettingsPath(userID) {
    return path.join(__dirname, '../store/usersettings/', `${userID.toString()}.json`);
  },

  createUserSettings(user) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.userSettingsPath(user),
        JSON.stringify(this.userSettingsTemplate),
        (err) => {
          if (err) reject(err);
          resolve();
        });
    });
  },

  getUserSettingsFromFile(userID) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.userSettingsPath(userID), (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  },

};

module.exports = User;
