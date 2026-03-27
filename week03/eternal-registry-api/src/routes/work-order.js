const routes = require('express').Router();
const { findAll, findById, create, update, deleteOne } = require('../controllers/work-orders');
const { workOrderValidationRules, validate } = require('../utils/validators');


routes.get('/', findAll);
routes.get('/:id', findById);
routes.post('/',workOrderValidationRules(), validate, create);
routes.put('/:id',workOrderValidationRules(), validate, update);
routes.delete('/:id', deleteOne);

module.exports = routes;