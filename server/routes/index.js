const express = require('express');

const days = require('../helpers/days');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'index',
  });
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    tv: {
      days: days.getListOfFive(5, -2, 'D MMM'),
    },
    weather: {
      days: days.getListOfFive(4, 0, 'ddd, D MMM'),
    },
  });
});

module.exports = router;
