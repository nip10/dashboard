require('./config/config');

const path = require('path');
const morgan = require('morgan');
const pug = require('pug');
const express = require('express');
const app = express();
const port = process.env.PORT;

const {Movies} = require('./models/movies');
const {Weather} = require('./models/weather');
const {Days} = require('./models/days');

// Morgan for req logs
app.use(morgan('dev'));

// Set views path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, '../public')));
// Set pug as view engine
app.set('view engine', 'pug');

// VIEWS
// dashboard
app.get('/', (req, res) => {
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

// API
// Movies
app.get('/api/movies', (req, res) => {
    Movies.getMovies().then((movies) => {
        res.send(movies);
    });
});

// WEATHER
// Conditions
app.get('/api/weather/conditions', (req, res) => {
    Weather.getConditions().then((conditions) => {
        res.status(200).send({
            location: conditions.current_observation.display_location.full,
            temperature: conditions.current_observation.temp_c,
            humidity: conditions.current_observation.relative_humidity,
            description: conditions.current_observation.weather,
            icon: conditions.current_observation.icon,
            localtime: conditions.current_observation.local_time_rfc822,
            lastupdate: conditions.current_observation.observation_time_rfc822
        });
    });
});

// Forecast
app.get('/api/weather/forecast', (req, res) => {
    Weather.getForecast().then((forecast) => {
        res.status(200).send(forecast);
    });
});

// ERRORS

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('Something broke!');
})

app.use((req, res, next) => {
    res.status(404).send('Not found!');
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
