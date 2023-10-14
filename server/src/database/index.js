import knex from 'knex';

import knexfile from '../../knexfile';

const DB = knex(knexfile.development);

export default DB;
