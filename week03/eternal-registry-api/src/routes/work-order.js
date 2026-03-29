const routes = require('express').Router();
const { findAll, findById, create, update, deleteOne } = require('../controllers/work-orders');
const { workOrderValidationRules, validate } = require('../utils/validators');
const { isAuthenticated } = require('../middlewares/auth');

routes.get('/', findAll);
routes.get('/:id', findById);
routes.post('/',isAuthenticated, workOrderValidationRules(), validate, create);
routes.put('/:id',isAuthenticated, workOrderValidationRules(), validate, update);
routes.delete('/:id',isAuthenticated, deleteOne);

module.exports = routes;