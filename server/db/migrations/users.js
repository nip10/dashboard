exports.up = (knex, Promise) => {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
