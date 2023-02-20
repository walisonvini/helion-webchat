exports.up = async (knex) => knex.schema.createTable('publicMessages', (table) => {
  table.increments('id');

  table.text('subject').notNullable();
  table.integer('sent_from_id').notNullable();
  table.integer('group_id').notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());

  table.foreign('sent_from_id').references('id').inTable('users').onDelete('CASCADE');
  table.foreign('group_id').references('id').inTable('groups').onDelete('CASCADE');
});

exports.down = async (knex) => knex.schema.dropTable('publicMessages');
