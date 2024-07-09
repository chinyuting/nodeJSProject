const Users = require('../models/UsersModel');

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
  try {
    // Access decoded user info from JWT token
    console.log('Authenticated user:', req.user);

    // Fetch users (example)
    const users = await Users.signInUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

module.exports = {
  rgstUsers,signInUsers
  // Add more controller functions as needed
};
