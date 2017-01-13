const {Days} = require('../helpers/days');
var express = require('express');
var router  = express.Router();

router.get('/', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        tv: {
            days: Days.getList(5, -2, 'D MMM')
        },
        weather: {
            days: Days.getList(4, 0, 'ddd, D MMM')
        }
    });
});

module.exports = router;
