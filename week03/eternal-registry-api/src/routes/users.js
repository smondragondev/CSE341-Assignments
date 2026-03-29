const routes = require('express').Router();
const { findAll, findById, create, update, deleteOne } = require('../controllers/users');
const { userValidationRules, validate } = require('../utils/validators');
const { isAuthenticated } = require('../middlewares/auth');

routes.get('/', findAll);
routes.get('/:id', findById);
routes.post('/',userValidationRules(), validate, create);
routes.put('/:id',isAuthenticated,userValidationRules(), validate, update);
routes.delete('/:id',isAuthenticated, deleteOne);

module.exports = routes;