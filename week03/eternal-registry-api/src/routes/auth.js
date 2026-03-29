const routes = require('express').Router();
const { loginPassword, logout } = require('../controllers/auth');
const { loginValidationRules, validate } = require('../utils/validators');

routes.post('/login/password', loginValidationRules(),validate, loginPassword);
routes.post('/logout',logout);

module.exports = routes; 