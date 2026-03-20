const routes = require('express').Router();
const { findAll, findById, create, update, deleteOne } = require('../controllers/burial-records');

routes.get('/', findAll);
routes.get('/:id', findById);
routes.post('/', create);
routes.put('/:id', update);
routes.delete('/:id', deleteOne);

module.exports = routes;