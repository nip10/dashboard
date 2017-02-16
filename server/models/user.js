const fs = require('fs');
const moment = require('moment');
const path = require('path');

const User = {

  userSettingsTemplate: {
    isNew: true,
    createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
    lastUpdate: null,
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
      location: null,
      unit: null,
    },
  },

  userSettingsPath(user) {
    return path.join(__dirname, '../store/usersettings/', `${user.id.toString()}.json`);
  },

  createUserSettings(user) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.userSettingsPath(user), JSON.stringify(this.userSettingsTemplate), (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },

  getUserSettings(user) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.userSettingsPath(user), (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  },
};

module.exports = User;
