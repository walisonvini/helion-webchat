exports.up = async (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id');

  table.string('username').unique().notNullable();
  table.string('password').notNullable();
  table.string('email').unique().notNullable();
  table.string('full_name').notNullable();
  table.string('profile_picture', 300);

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = async (knex) => knex.schema.dropTable('users');
