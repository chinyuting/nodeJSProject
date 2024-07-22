const { Pool } = require('pg');

// database 資料
const dbPool = new Pool({
  user: 'chiupostgres',
  host: 'localhost',
  database: 'todos_database',
  password: 'chiupostgres',
  port: 5432, // Default PostgreSQL port
  max: 5,
  min: 0,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 10000
});

module.exports = dbPool;
