import express from 'express';

import User from '../models/user';

const router = express.Router();

/*
Desc: Update user settings (add/remove/edit)
Params: userID, setting Name, setting Data
  settingName needs to be a key of the userSettings json template.
Return: Updates userSettings json file and userSettings cookies
*/
router.put('/settings', (req, res) => {
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
