// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 可以使用的方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 可以使用的header
  exposedHeaders: ['Authorization']
}));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json());
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});