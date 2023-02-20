exports.up = async (knex) => knex.schema.createTable('groups', (table) => {
  table.increments('id');

  table.string('name', 100).notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());
});

exports.down = async (knex) => knex.schema.dropTable('groups');
