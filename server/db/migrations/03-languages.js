exports.up = (knex, Promise) => knex.schema.createTableIfNotExists('languages', (table) => {
  table.increments('id');
  table.string('code').unique().notNullable();
  table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
});

exports.down = (knex, Promise) => knex.schema.dropTable('languages');