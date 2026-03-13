const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);
routes.get('/:temple_id', temples.findOne);
routes.get('/published', temples.findAllPublished);

routes.post('/', temples.create);
routes.put('/:id', temples.update);
routes.delete('/:id', temples.delete);
routes.delete('/', temples.deleteAll);

module.exports = routes;
