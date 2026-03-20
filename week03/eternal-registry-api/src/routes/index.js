const routes = require('express').Router();
const burialRecords = require('./burial-records');
const swagger = require('./swagger');

routes.use('/burial-records', burialRecords);
routes.use('/api-docs', swagger)
module.exports = routes;