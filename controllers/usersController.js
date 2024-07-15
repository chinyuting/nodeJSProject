const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Users = require('../models/UsersModel');
const secretKey = process.env.JWT_SECRET_KEY;

/* 
  使用者註冊 UsersModel.rgstUsers
  @param request and response
*/
async function rgstUsers(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, nickName } = req.body;
  try {
    const users = await Users.rgstUsers({ email, password, nickName });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error registering user' });
  }
}

/* 
  使用者登入 UsersModel.signInUsers
  @param request and response
*/
async function signInUsers(req, res) {
  const { email, password } = req.body;
  try {
    const users = await Users.signInUsers({ email, password });

    //  users id和email產生jwt token
    if (!users) {
      res.status(401).json({error:'Login error, please check your email and password'});
    }
    const token = jwt.sign(
      { id: users.id, email: users.email },
      `${secretKey}`,  // 使用您的密鑰
      { expiresIn: '1h' }
    );
    //  Bearer token
    res.header('Authorization', `Bearer ${token}`);

    // 返回users
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

module.exports = {
  rgstUsers,signInUsers
  // Add more controller functions as needed
};
