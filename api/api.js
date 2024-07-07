// backend/routes/api.js
const express = require('express');
const router = express.Router();

const users = [
  { name: 'shelly', phone: '0988888888' },
  { name: 'mao', phone: '0977777777' },
];


// Example API endpoint
router.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Another API endpoint to get user data
router.get('/user/:name', (req, res) => {
  const name = req.params.name;
  const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
  if (user) {
    res.json({ phone: user.phone });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// API endpoint to post data
router.post('/data', (req, res) => {
  const receivedData = req.body;
  res.json({
    message: 'Data received successfully',
    data: receivedData
  });
});

module.exports = router;