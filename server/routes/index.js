const { Days } = require('../helpers/days');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    // TODO: Check if user is logged-in, if yes redirect to /dashboard, else redirect to /login
  res.render('index', {
    title: 'index',
  });
});

router.get('/dashboard', (req, res) => {
    // TODO: Check if user is logged-in, if not redirect to /login
  res.render('dashboard', {
    title: 'Dashboard',
    tv: {
      days: Days.getList(5, -2, 'D MMM'),
    },
    weather: {
      days: Days.getList(4, 0, 'ddd, D MMM'),
    },
  });
});

module.exports = router;
