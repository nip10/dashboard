exports.seed = function (knex, Promise) {
  return knex('weather').del()
  .then(() =>
      knex('weather').insert({
        lat: '41.158212',
        lng: '-8.629166',
        country: 'Portugal',
        city: 'Porto',
        unit: 'c',
        user_id: 1,
      }))
      .then(() => knex('weather').insert({
        lat: '40.416780',
        lng: '-3.703790',
        country: 'Spain',
        city: 'Madrid',
        unit: 'c',
        user_id: 2,
      }))
      .then(() => knex('weather').insert({
        lat: '41.158212',
        lng: '-8.629166',
        country: 'Portugal',
        city: 'Porto',
        unit: 'f',
        user_id: 3,
      }));
};
