const express = require('express');
const validator = require('validator');
const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');
const User = require('../models/user');
const chalk = require('chalk');

const debug = console.log();

const router = express.Router();

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  if (!validator.isEmail(email) || validator.isEmpty(email)) {
    return res.status(500).json({ status: 'Invalid Email' });
  }
  const password = req.body.password;
  if (validator.isEmpty(password)) {
    return res.status(500).json({ status: 'Invalid Password' });
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */
  req.body.email = validator.normalizeEmail(email);

  return passport.authenticate('local', (err, user) => {
    if (err) { res.status(500).json({ status: err }); }
    if (!user) { res.status(404).json({ status: 'User not found' }); }
    if (user) {
      debug(chalk.blue('User %s connected'), user.id);
      User.getUserSettingsFromFile(user.id)
        .then(userSettings => res.cookie('userSettings', userSettings))
        .then(() => req.logIn(user, (error) => {
          if (error) { res.status(500).json({ status: error }); }
          res.status(200).json({ status: 'success' });
        }))
        .catch(e => res.status(500).json({ status: e }));
    }
  })(req, res, next);
});

router.post('/signup', (req, res, next) =>
  authHelpers.createUser(req, res)
    .then(() => new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (user) { resolve(user); }
        reject();
      })(req, res, next);
    }))
    .then(user => User.createUserSettings(user))
    .then(() => res.status(200).json({ status: 'success' }))
    .catch(err => res.status(500).json({ status: err })));

module.exports = router;
