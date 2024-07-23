const pool = require('../config/postgresqlConfig');
const cryptoJS = require("crypto-js");

/* 
  email是否重複使用
  @param {String} email - user email由registerUsersValidator傳入
*/
async function findUserByEmail(email) {
  const connection = await pool.connect();
  try {
    const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('result', result);
    return result.rows[0];
  } finally {
    connection.release();
  }
}

/* 
  使用者註冊
  @param {Object} userData - email, password, nickname
*/
async function registerUsers(userData) {
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
  @param {Object} userData - email, password
*/
async function signInUsers(userData) {
  const { email, password } = userData;
  const connection = await pool.connect();
  try {
      // password雜湊(SHA256)
      const result = await connection.query(`SELECT * FROM users WHERE email = $1 and password = $2` ,
      [email, cryptoJS.SHA256(password).toString(cryptoJS.enc.Hex)]);
      const rowData = result.rows;
      if (rowData.length > 0) {
        return rowData[0];
      } else {
        return null;
      }
  } finally {
    connection.release();
  }
}

// async function signOutUsers(userData) {
//   const connection = await pool.connect();
//   try {
      
//   } finally {
//     connection.release();
//   }
// }

module.exports = {
  registerUsers,
  signInUsers,
  findUserByEmail,
};