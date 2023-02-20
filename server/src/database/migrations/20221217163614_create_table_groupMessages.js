exports.up = async (knex) => knex.schema.createTable('groupMessages', (table) => {
  table.increments('id');

  table.integer('group_id').notNullable();
  table.integer('user_id').notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());

  table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  table.foreign('group_id').references('id').inTable('groups').onDelete('CASCADE');
});

exports.down = async (knex) => knex.schema.dropTable('groupMessages');
