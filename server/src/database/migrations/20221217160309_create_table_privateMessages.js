exports.up = async (knex) => knex.schema.createTable('privateMessages', (table) => {
  table.increments('id');

  table.text('subject').notNullable();
  table.integer('sent_from_id').notNullable();
  table.integer('sent_to_id').notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());

  table.foreign('sent_from_id').references('id').inTable('users').onDelete('CASCADE');
  table.foreign('sent_to_id').references('id').inTable('users').onDelete('CASCADE');
});

exports.down = async (knex) => knex.schema.dropTable('privateMessages');
