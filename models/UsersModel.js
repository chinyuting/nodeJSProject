const pool = require('../config/postgresqlConfig');

async function rgstUsers(req) {
  console.log(req);
  // const connection = await pool.connect();
  // try {
  //   const email = "test1@email.com";
  //   const password = "333"
  //   const nickName = "testUser1"
  //   const result = await connection.query(`INSERT INTO Users (email, password, nickName) 
  //   VALUES (${email}, ${password}, ${nickName})`);

  //   return result.rows;
  // } finally {
  //   connection.release();
  // }
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