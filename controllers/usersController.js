const jwt = require('jsonwebtoken');
const Users = require('../models/UsersModel');
const secretKey = process.env.JWT_SECRET_KEY;

/* 
  使用者註冊 引用UsersModel.registerUsers
  @param {Object} request
         {Object} response
*/
async function registerUsers(req, res) {
  const { email, password, nickname } = req.body.user;
  try {
    const users = await Users.registerUsers({ email, password, nickname });
    res.status(200).json({
      user: {
        email: users.email,
        nickname: users.nickname
      },
      message: `註冊成功!`
    });
  } catch (err) {
    res.status(500).json({ err, error: '系統忙碌中' });
  }
}

/* 
  使用者登入 引用UsersModel.signInUsers
  @param {Object} request
         {Object} response
*/
async function signInUsers(req, res) {
  const { email, password } = req.body.user;
  try {
    const users = await Users.signInUsers({ email, password });
    //  users id和email產生jwt token
    if (!users) {
      return res.status(401).json({ errors: [{ msg: '帳號或密碼錯誤，請確認' }] });
    }
    const token = jwt.sign(
      { id: users.id, email: users.email },
      `${secretKey}`,  // 密鑰
      { expiresIn: '1h' }
    );
    //  在header帶入Bearer token
    res.header('Authorization', `Bearer ${token}`);

    // 返回users
    res.status(200).json({
      user: {
        email: users.email,
        nickname: users.nickname
      },
      message: `登入成功, ${users.nickname}!`
    });
  } catch (err) {
    res.status(401).json({ errors: [{ msg: '系統忙碌中' }] });
  }
}

module.exports = {
  registerUsers, signInUsers
};
