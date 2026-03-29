const routes = require('express').Router();
const { loginPassword, loginGithub, githubCallback, logout } = require('../controllers/auth');
const { loginValidationRules, validate } = require('../utils/validators');

routes.post('/login/password', loginValidationRules(),validate, loginPassword);
routes.get('/auth/github', loginGithub );
routes.get('/auth/github/callback', githubCallback);
//   passport.authenticate('github', { failureRedirect: '/api-docs' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
routes.post('/logout',logout);

module.exports = routes; 