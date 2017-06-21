exports.seed = function (knex, Promise) {
  return knex('languages').del()
    .then(() =>
       knex('languages').insert({
         code: 'pt',
       }))
       .then(() => knex('languages').insert({
         code: 'en',
       }));
};
