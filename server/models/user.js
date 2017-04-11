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
    return path.join(__dirname, '../store/usersettings/', `${_.toString(userID)}.json`);
  },

  createUserSettings(user, lang) {
    const tempSettings = {
      username: user.email.slice(0, _.indexOf(user.email, '@')),
      email: {
        address: user.email,
      },
      language: lang,
      createdAt: moment(user.created_at).format('DD-MM-YYYY HH:mm:ss'),
      lastUpdate: moment(user.created_at).format('DD-MM-YYYY HH:mm:ss'),
    };
    const userSettings = _.assign({}, this.userSettingsTemplate, tempSettings);
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
          resolve(userSettings);
        });
    });
  },

  editUserSettings(userID, settingName, settingData) {
    return new Promise((resolve, reject) => {
      this.getUserSettingsFromFile(userID)
        .then((userSettings) => {
          for (let i = 0; i < settingName.length; i++) {
            _.set(userSettings, settingName[i], settingData[i]);
          }
          return this.updateUserSettingsFile(userID, userSettings);
        })
        .then((userSettings) => {
          resolve(userSettings);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  addUserSettings(userID, setting, data) {
    return new Promise((resolve, reject) => {
      this.getUserSettingsFromFile(userID)
        .then((userSettings) => {
          _.get(userSettings, setting).push(data);
          this.updateUserSettingsFile(userID, userSettings);
          resolve(userSettings);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  removeUserSettings(userID, setting, data) {
    return new Promise((resolve, reject) => {
      this.getUserSettingsFromFile(userID)
        .then((userSettings) => {
          _.pull(_.get(userSettings, setting), data);
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
