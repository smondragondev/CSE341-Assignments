const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

// #swagger.ignore = true
routes.use('/', swaggerUi.serve);
routes.get('/', swaggerUi.setup(swaggerDocument));

module.exports = routes;