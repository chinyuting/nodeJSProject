const pool = require('../config/postgresqlConfig');

async function rgstUsers(req, res) {
  const { email, password, nickname } = req.body;  

  const connection = await pool.connect();
  try {
    console.log(connection);
    const result = await connection.query('INSERT INTO users (email, password, nickname) VALUES ($1, $2, $3) RETURNING *',[email, password, nickname]);
    
    return result.rows[0];
  } finally {
    connection.release();
  }
}

async function signInUsers(email, password) {
  const client = await pool.connect();
  try {
      const result = await client.query(`SELECT * FROM users WHERE email = $1 and password = $2` ,
      [email, password]);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
          return null;
      }
  } finally {
    client.release();
  }
}

module.exports = {
    rgstUsers,
    signInUsers,
  // Add more model methods as needed
};