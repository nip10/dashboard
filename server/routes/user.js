const express = require('express');
const User = require('../models/user');

const router = express.Router();

// update user settings (add/remove/edit)
router.patch('/settings', (req, res) => {
  const userID = req.user;
  const settingName = req.body.settingName;
  const settingData = req.body.settingData;
  User.updateUserSettings(userID, settingName, settingData)
    .then((userSettings) => {
      res.cookie('userSettings', JSON.stringify(userSettings)).status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

module.exports = router;
