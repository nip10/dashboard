exports.up = (knex, Promise) => knex.schema.createTableIfNotExists('usertv', (table) => {
  table.increments('id');
  table.integer('user_id').references('users.id');
  table.integer('tvshow_id').references('tvshows.id');
  table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
});

exports.down = (knex, Promise) => knex.schema.dropTable('usertv');