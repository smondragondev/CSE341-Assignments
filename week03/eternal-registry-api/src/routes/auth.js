const routes = require('express').Router();
const { loginPassword, loginGithub, githubCallback, logout } = require('../controllers/auth');
const { loginValidationRules, validate } = require('../utils/validators');

routes.post('/login/password', loginValidationRules(),validate, loginPassword);
routes.get('/github', loginGithub );
routes.get('/github/callback', githubCallback);

routes.post('/logout',logout);

module.exports = routes; 