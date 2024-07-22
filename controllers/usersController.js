const jwt = require('jsonwebtoken');
const Users = require('../models/UsersModel');
const secretKey = process.env.JWT_SECRET_KEY;

/* 
  使用者註冊 引用UsersModel.rgstUsers
  @param {Object} request
         {Object} response
*/
async function rgstUsers(req, res) {
  console.log(req.body);
  const { email, password, nickname } = req.body.user;
  try {
    const users = await Users.rgstUsers({ email, password, nickname });
    // res.json(users);
    res.status(200).json({
      user: {
        email: users.email,
        nickname: users.nickname
      },
      message: `註冊成功!`
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    // res.status(500).json({ err, error: 'Error registering user' });
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
      res.status(401).json({error:'Login error, please check your email and password'});
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
    console.error('Error fetching users:', err);
    res.status(500).json({err, error: 'Error fetching users' });
  }
}

module.exports = {
  rgstUsers,signInUsers
};
