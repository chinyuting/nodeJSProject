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

async function signInUsers() {
    const client = await pool.connect();
    try {
        const email = "test1@email.com";
        const password = "333"
        const result = await client.query(`SELECT * FROM users WHERE email = ${email} and password = ${password}`);
        
        
        
        return result.rows;
    } finally {
      client.release();
    }
  }

module.exports = {
    rgstUsers,
    signInUsers,
  // Add more model methods as needed
};