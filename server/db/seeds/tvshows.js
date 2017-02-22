exports.seed = function(knex, Promise) {
  return knex('tvshows').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('tvshows').insert({
        show: 'Suits',
        season: 3,
        episode: 4,
        airdate: '2017-02-01'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'Simpsons',
        season: 23,
        episode: 6,
        airdate: '2017-02-01'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'Person of Interest',
        season: 5,
        episode: 2,
        airdate: '2017-02-02'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'Homeland',
        season: 2,
        episode: 7,
        airdate: '2017-02-02'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'How to get away',
        season: 6,
        episode: 4,
        airdate: '2017-02-03'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'House',
        season: 7,
        episode: 10,
        airdate: '2017-02-03'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'Dr House',
        season: 3,
        episode: 18,
        airdate: '2017-02-04'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'Person of Interest',
        season: 5,
        episode: 6,
        airdate: '2017-02-04'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'Chicago PD',
        season: 4,
        episode: 1,
        airdate: '2017-02-05'
      });
    }).then(function () {
      return knex('tvshows').insert({
        show: 'Suits',
        season: 5,
        episode: 7,
        airdate: '2017-02-05'
      });
    });
};