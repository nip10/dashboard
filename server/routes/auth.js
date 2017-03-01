const express = require('express');
const validator = require('validator');
const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');
const User = require('../models/user');
const chalk = require('chalk');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  if (!validator.isEmail(email) || validator.isEmpty(email)) {
    return handleResponse(res, 500, 'invalid email');
  }
  const password = req.body.password;
  if (validator.isEmpty(password)) {
    return handleResponse(res, 500, 'invalid password');
  }

  req.body.email = validator.normalizeEmail(email); /* eslint no-param-reassign: ["error", { "props": false }] */

  passport.authenticate('local', (err, user) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      console.log(chalk.blue('User %s connected'), user.id);
      User.getUserSettingsFromFile(user.id)
        .then((userSettings) => {
          res.cookie('userSettings', userSettings);
        })
        .then(() => {
          req.logIn(user, (err) => {
            if (err) { handleResponse(res, 500, 'error'); }
            handleResponse(res, 200, 'success');
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
    .then(() => handleResponse(res, 200, 'success'))
    .catch(err => handleResponse(res, 500, 'error')));

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
