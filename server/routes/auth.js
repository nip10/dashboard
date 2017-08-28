import express from 'express';
import validator from 'validator';
import chalk from 'chalk';

import passport from '../auth/local';
import authHelpers from '../auth/_helpers';

const router = express.Router();

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  if (!validator.isEmail(email) || validator.isEmpty(email)) {
    return res.status(400).json({ error: 'Invalid Email' });
  }
  const password = req.body.password;
  if (validator.isEmpty(password)) {
    return res.status(400).json({ error: 'Invalid Password' });
  }

  req.body.email = validator.normalizeEmail(email);

  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ error: 'Error in passport authenticate' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.log(chalk.blue('User %s connected'), user.id);
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: 'Error in passport logIn' });
      return res.status(200).json({ status: 'success' });
    });
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
    .then(() => res.status(200).json({ status: 'success' }))
    .catch(err => res.status(500).json({ error: err }))
);

router.get('/logout', (req, res) => {
  if (!req.user) return res.redirect('/');
  req.logout();
  res.redirect('/');
});

module.exports = router;
