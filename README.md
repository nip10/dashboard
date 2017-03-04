# Dashboard

Fully-costumizable modular dashboard which was originally designed to be a web-brower homepage.

The first realease/stage will have the following modules:

* Weather (conditions and forecast)
* TV-Show calendar (track your favourite TV-Shows)
* Latest movies (check the latest releases)
* To-do lists
* Email client (get unread messages from any email address)
* Offline use: ability to use cached data for offline use (tvshows list, to-do's list, ...)


## Current Status

Working:

- [X] User authentication (sign-up, login)
- [x] Weather
- [x] Movies
- [x] Front-end

TODOs:

- [ ] TV Shows (90% - db population missing)
- [ ] User settings (70%)
- [ ] Email client

Less "important":
- [ ] Redis for session storage
- [ ] Use sass instead of css
- [ ] gulp/webpack
- [ ] PM2


## Stack

* Nodejs (ES6)

#### API
* Express

#### Auth
* Passport
* bcrypt

#### Database
* PostgresSQL

#### Views/Front-end
* Pug
* Bootstrap
* jQuery

#### Others
* Linter:

    * ESLint (airbnb)


## How-to

1. clone the repo or download zip file
2. edit .env.sample and rename to .env
3. edit server/db/knexfile.sample.js and rename to knexfile.js
4. run 'npm install'
5. run 'npm start' (nodemon)
or
5. run 'npm run' (node)
