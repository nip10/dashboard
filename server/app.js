const path = require('path');
const morgan = require('morgan');
const pug = require('pug');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// const favicon = require('serve-favicon');
const express = require('express');

const app = express();

const index = require('./routes/index');
const auth = require('./routes/auth');
const movies = require('./routes/movies');
const weather = require('./routes/weather');
const tvshows = require('./routes/tvshows');
// var const = require('./routes/email');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_KEY_SESSION,
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  // store: sessionStore,
  cookie: { httpOnly: true, maxAge: 2419200000 }, // configure when sessions expires
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));
// app.use(favicon(__dirname + '/public/favicon.ico'));

app.use('/', index);
app.use('/api/auth', auth);
app.use('/api/weather', weather);
app.use('/api/movies', movies);
app.use('/api/tvshows', tvshows);
// app.use('/api/email', email);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {},
  });
});

module.exports = app;
