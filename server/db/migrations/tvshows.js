exports.up = (knex, Promise) => knex.schema.createTableIfNotExists('tvshows', (table) => {
  table.increments();
  table.string('show').notNullable();
  table.integer('season').notNullable();
  table.integer('episode').notNullable();
  table.date('airdate').notNullable();
  table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
});

exports.down = (knex, Promise) => knex.schema.dropTable('tvshows');
