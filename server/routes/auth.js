const express = require('express');
const router = express.Router();
const validator = require('validator');
const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');
const User = require('../models/user');

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

  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        handleResponse(res, 200, 'success');
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

// *** helpers *** //

function handleLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
