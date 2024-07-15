const pool = require('../config/postgresqlConfig');
const cryptoJS = require("crypto-js");

/* 
  使用者註冊
  @param request and response
*/
async function rgstUsers(userData) {
  const { email, password, nickname } = userData;
  const connection = await pool.connect();
  try {
    // password雜湊(SHA256)
    const result = await connection.query('INSERT INTO users (email, password, nickname) VALUES ($1, $2, $3) RETURNING *',[email, cryptoJS.SHA256(password).toString(cryptoJS.enc.Hex), nickname]);
    return result.rows[0];
  } finally {
    connection.release();
  }
}

/* 
  使用者登入
  @param request and response
*/
async function signInUsers(userData) {
  const { email, password } = userData;
  const client = await pool.connect();
  try {
      // password雜湊(SHA256)
      const result = await client.query(`SELECT * FROM users WHERE email = $1 and password = $2` ,
      [email, cryptoJS.SHA256(password).toString(cryptoJS.enc.Hex)]);
      const rowData = result.rows;
      if (rowData.length > 0) {
        // res.body.json({message:`Login success, welcome ${rowData[0].nickname}!`})
        return rowData[0];
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