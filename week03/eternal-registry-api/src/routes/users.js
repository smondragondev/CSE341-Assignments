const routes = require('express').Router();
const { findAll, findById, create, update, deleteOne } = require('../controllers/users');
const { userValidationRules, validate } = require('../utils/validators');


routes.get('/', findAll);
routes.get('/:id', findById);
routes.post('/',userValidationRules(), validate, create);
routes.put('/:id',userValidationRules(), validate, update);
routes.delete('/:id', deleteOne);

module.exports = routes;