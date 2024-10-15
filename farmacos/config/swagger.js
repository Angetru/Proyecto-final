//swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Aplicacion backend con autenticación JWT - Proyecto Lista de Farmacos',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
    },
    },
    security: [
      {
        BearerAuth: [],
  },
    ],
    },
  apis: ['./routes/*.js'], // archivos conteniendo anotaciones
};

module.exports = swaggerJsdoc(swaggerOptions);