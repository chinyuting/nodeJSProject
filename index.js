// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500', // 允许的来源
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的头部
  exposedHeaders: ['Authorization']
}));

app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json());
// app.use(verifyToken); // Apply JWT token verification middleware
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});