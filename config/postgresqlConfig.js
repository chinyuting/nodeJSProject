const { Pool } = require('pg');

const dbPool = new Pool({
  user: 'chiupostgres',
  host: 'localhost',
  database: 'todos_database',
  password: 'chiupostgres',
  port: 5432, // Default PostgreSQL port
});

module.exports = dbPool;
