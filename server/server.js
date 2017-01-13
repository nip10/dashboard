require('dotenv').config();

const path = require('path');
const morgan = require('morgan');
const pug = require('pug');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const express = require('express');
const app = express();
const port = process.env.PORT;

var index = require('./routes/index');
var movies = require('./routes/movies');
var weather = require('./routes/weather');
// var email = require('./routes/email');
// var tvshows = require('./routes/tvshows');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('[MYSQL] Error connecting: ' + err.stack);
    return process.exit(1); // process.exitCode = 1;
  }
  console.log('[MYSQL] Connected as id: ' + connection.threadId);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use('/', index);
app.use('/api/weather', weather);
app.use('/api/movies', movies);
// app.use('/api/tvshows', tvshows);
// app.use('/api/email', email);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

// APP
app.listen(port, () => {
    console.log(`[APP] Started on port ${port}`);
});
