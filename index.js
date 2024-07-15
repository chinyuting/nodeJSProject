// backend/index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const port = 3000;

// Middleware usage
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json());
// app.use(verifyToken); // Apply JWT token verification middleware
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});