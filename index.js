// backend/index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const apiRoutes = require('./routes/apiRoutes');
const port = 3000;


// Middleware to verify JWT token
// function verifyToken(req, res, next) {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(403).json({ error: 'Token not provided' });
//   }

//   jwt.verify(token, 'your_secret_key', (err, decoded) => {
//     if (err) {
//       console.error('Error verifying token:', err);
//       return res.status(401).json({ error: 'Failed to authenticate token' });
//     }
//     req.user = decoded;
//     next();
//   });
// }


// Middleware usage
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json());
// app.use(verifyToken); // Apply JWT token verification middleware
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});