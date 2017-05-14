import express from 'express';

import Helpers from '../auth/_helpers';

import User from '../models/user';

const router = express.Router();

// Edit setting (single-valued keys or multi-value keys)
router.put('/settings', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;
  const settingName = req.body.settingName;
  const settingData = req.body.settingData;
  User.editUserSettings(userID, settingName, settingData)
    .then((userSettings) => {
      res.cookie('userSettings', JSON.stringify(userSettings)).status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

// Add value to setting (multi-value keys)
router.patch('/settings', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;
  const settingName = req.body.settingName;
  const settingData = req.body.settingData;
  User.addUserSettings(userID, settingName, settingData)
    .then((userSettings) => {
      res.cookie('userSettings', JSON.stringify(userSettings)).status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

// Remove value from setting (multi-value keys)
router.delete('/settings', Helpers.isLoggedIn, (req, res) => {
  const userID = req.user;
  const settingName = req.body.settingName;
  const settingData = req.body.settingData;
  User.removeUserSettings(userID, settingName, settingData)
    .then((userSettings) => {
      res.cookie('userSettings', JSON.stringify(userSettings)).status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

module.exports = router;
