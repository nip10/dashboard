# Dashboard
---

**Note:** This project is being rewritten (and improved) from the original php version. It's in a very early stage.

Personal fully-costumizable dashboard which was originally designed to be a web-brower homepage. 
Some of the features:
* Weather and Forecast
* Email client
* TV-Show calendar
* Latest movies
* To-do lists
* Offline use: ability to use cached data for offline use (tvshows list, to-do's list, ...)


## Current Status
---

What is working/usable:
- [X] User authentication (sign-up, login)
- [x] Weather/Forecast
- [x] Movies
- [x] Front-end

TODOs 
- [ ] User settings (allow users to change several params)
- [ ] Refactor front-end js
- [ ] TV Shows db
- [ ] Movies db
- [ ] Email client
- [ ] Redis for session storage
- [ ] ES7 (async/await, imports/exports, ...) 
- [ ] sass instead of css
- [ ] gulp/webpack (and Babel)
- [ ] PM2

## Stack
---

* Nodejs (ES6)

#### API
* Express

#### Auth
* Passport

#### Database
* Postgres

#### Views/Front-end
* Pug
* Bootstrap
* jQuery

#### Others
* Linter:
-- ESLint (airbnb)

## How-to
---

**Note:**  This is in early stages.
EDIT: Back-end auth was refactored, so the front-end needs some tweaks.


1. clone the repo or download zip file
2. run 'npm install'
3. run 'npm start' or 'npm watch'



