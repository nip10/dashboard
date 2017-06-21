exports.seed = function (knex, Promise) {
  return knex('weather').del()
  .then(() =>
      knex('weather').insert({
        country: 'Portugal',
        city: 'Porto',
        unit: 'c',
        user_id: 1,
      }))
      .then(() => knex('weather').insert({
        country: 'Spain',
        city: 'Madrid',
        unit: 'c',
        user_id: 2,
      }))
      .then(() => knex('weather').insert({
        country: 'United Kingdom',
        city: 'London',
        unit: 'f',
        user_id: 3,
      }));
};
