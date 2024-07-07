// backend/index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../todolist')));

// Example API endpoint
const apiRoutes = require('./api/api');
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const express = require('express');
// const https = require('https');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Read SSL certificate
// const options = {
//   key: fs.readFileSync('path/to/your/private.key'),
//   cert: fs.readFileSync('path/to/your/certificate.crt')
// };

// // Middleware to parse JSON
// app.use(express.json());

// // Serve static files from the frontend directory
// app.use(express.static(path.join(__dirname, '../frontend')));

// // Import and use API routes
// const apiRoutes = require('./api/api');
// app.use('/api', apiRoutes);

// // Start the HTTPS server
// https.createServer(options, app).listen(port, () => {
//   console.log(`HTTPS Server is running on https://localhost:${port}`);
// });