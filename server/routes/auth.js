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
    return res.status(500).json({ status: 'Invalid Email' });
  }
  const password = req.body.password;
  if (validator.isEmpty(password)) {
    return res.status(500).json({ status: 'Invalid Password' });
  }

  req.body.email = validator.normalizeEmail(email);

  passport.authenticate('local', (err, user) => {
    if (err) { return res.status(500).json({ status: 'Error in passport authenticate' }); }
    if (!user) { return res.status(404).json({ status: 'User not found' }); }
    if (user) {
      console.log(chalk.blue('User %s connected'), user.id);
      User.getUserSettingsFromFile(user.id)
        .then(userSettings => res.cookie('userSettings', userSettings))
        .then(() => {
          req.logIn(user, (err) => {
            if (err) { return res.status(500).json({ status: 'Error in passport logIn' }); }
            return res.status(200).json({ status: 'success' });
          });
        })
        .catch(err => res.status(500).json({ status: err }));
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
    .then(user => User.createUserSettings(user, req.acceptsLanguages()[0]))
    .then(() => res.status(200).json({ status: 'success' }))
    .catch(err => res.status(500).json({ status: err })));

module.exports = router;
