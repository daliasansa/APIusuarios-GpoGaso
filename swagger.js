const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestión de Usuarios',
      version: '1.0.0',
      description: 'API para gestionar usuarios con SQLite y Swagger',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
