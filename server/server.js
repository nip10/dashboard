const path = require('path');
const morgan = require('morgan');
const pug = require('pug');
const express = require('express');
const app = express();
const port = 3000;

// Morgan for req logs
app.use(morgan('dev'));

// Set views path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, '../public')));
// Set pug as view engine
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        tv: true
    });
});

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
