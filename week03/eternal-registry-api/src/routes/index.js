const routes = require('express').Router();
const burialRecords = require('./burial-records');
const users = require('./users');
const workOrders = require('./work-order');
const auth = require('./auth');
const swagger = require('./swagger');

routes.use('/burial-records', burialRecords);
routes.use('/users', users);
routes.use('/work-orders', workOrders);
routes.use('/auth', auth);
routes.use('/api-docs', swagger)
module.exports = routes;