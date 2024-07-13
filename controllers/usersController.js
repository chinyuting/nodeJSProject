const jwt = require('jsonwebtoken');
const Users = require('../models/UsersModel');
const secretKey = process.env.JWT_SECRET_KEY;

async function rgstUsers(req, res) {
  try {
    // Fetch users (example)
    const users = await Users.rgstUsers(req, res);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

async function signInUsers(req, res) {
  const { email, password } = req.body;
  try {
    // Access decoded user info from JWT token
    // console.log('Authenticated user:', req.user);

    // Fetch users (example)
    const users = await Users.signInUsers(email, password);

    const token = jwt.sign(
      { sub: users.userid, email: users.email },
      `${secretKey}`,  // 使用您的密鑰
      { expiresIn: '1h' }
    );
    res.header('Authorization', `Bearer ${token}`);

    // 返回用户数据
    res.status(200).json(users);
    // res.json(users);
    // res.header('Authorization', `Bearer ${token}`).status(200).send();
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

module.exports = {
  rgstUsers,signInUsers
  // Add more controller functions as needed
};
