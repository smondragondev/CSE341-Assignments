const routes = require('express').Router();
const { findAll, findById, create, update, deleteOne } = require('../controllers/burial-records');
const { burialRecordValidationRules, validate } = require('../utils/validators');
const { isAuthenticated } = require('../middlewares/auth');

routes.get('/', findAll);
routes.get('/:id', findById);
routes.post('/',isAuthenticated, burialRecordValidationRules(),validate, create);
routes.put('/:id',isAuthenticated,burialRecordValidationRules(),validate, update);
routes.delete('/:id',isAuthenticated, deleteOne);

module.exports = routes;