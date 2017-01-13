const {Movies} = require('../models/movies');
var express = require('express');
var router  = express.Router();

// Movies
router.get('/', (req, res) => {
    Movies.getMovies().then((movies) => {
        res.send(movies);
    });
});

module.exports = router;
