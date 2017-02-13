const fs = require('fs');
const moment = require('moment');
const path = require('path');

const User = {

  userSettingsPath: path.join(__dirname, '../store/usersettings/'),

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

  createUserSettings(user) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${this.userSettingsPath}${user.id}.json`, JSON.stringify(this.userSettingsTemplate), (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },
};

module.exports = User;
