const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const swaggerDefinitions = require('./swaggerDefinitions');

// Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'todos API',
  },
  servers: [
    {
      // api 網址
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, 'swaggerDefinitions.js')], // api文件網址
};

// Init swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;