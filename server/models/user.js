import fs from 'fs';
import moment from 'moment';
import path from 'path';
import _ from 'lodash';

const User = {

  userSettingsTemplate: {
    isNew: true,
    createdAt: null,
    lastUpdate: null,
    language: null,
    username: null,
    tvshows: {
      quality: [],
      source: [],
      shows: [],
    },
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

  createUserSettings(user, lang) {
    const userSettings = Object.assign({}, this.userSettingsTemplate);
    userSettings.email.emailAddress = user.email;
    userSettings.language = lang;
    userSettings.username = user.email.slice(0, user.email.indexOf('@'));
    userSettings.createdAt = userSettings.lastUpdate = moment(user.created_at).format('DD-MM-YYYY HH:mm:ss');
    return new Promise((resolve, reject) => {
      fs.writeFile(this.userSettingsPath(user.id),
        JSON.stringify(userSettings),
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

  updateUserSettingsFile(userID, userSettings) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.userSettingsPath(userID),
        JSON.stringify(userSettings),
        (err) => {
          if (err) reject(err);
          resolve();
        });
    });
  },

  updateUserSettings(userID, setting, data) {
    return new Promise((resolve, reject) => {
      this.getUserSettingsFromFile(userID)
        .then((userSettings) => {
          _.set(userSettings, setting, data);
          // this doesnt work to remove tvshows because it overwrites the array.
          // solution1: get the array, remove the tvshow, set the new array
          this.updateUserSettingsFile(userID, userSettings);
          resolve(userSettings);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

};

module.exports = User;
