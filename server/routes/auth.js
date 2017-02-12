const express = require('express');
const router  = express.Router();

const validator = require('validator');

const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');

router.post('/login', (req, res) => {
    const email = req.body.email;
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
        return res.send('Please enter a valid email.'); // refactor (send object with http status code + message)
    }
    const password = req.body.password;
    if (validator.isEmpty(password)) {
        return res.send('Please enter a password.'); // refactor (send object with http status code + message)
    }
    const emailNormalized = validatior.normalizeEmail(email);    

    // TODO: Add passport integration
    // TODO: Redirect to /dashboard or /login

    res.send('ajax auth post sucess');
});

router.post('/register', (req, res, next) => {
    return authHelpers.createUser(req, res)
        .then((response) => {
            passport.authenticate('local', (err, user, info) => {
                if (user) { 
                    handleResponse(res, 200, 'success'); 
                } else {
                    handleResponse(res, 500, 'error');
                }
            })(req, res, next);
        })
        .catch((err) => { handleResponse(res, 500, 'error'); });
    // TODO: Create a JSON file for user settings (see rootpath/user_settings_example.json)
});

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
  res.status(code).json({status: statusMsg});
}

module.exports = router;
