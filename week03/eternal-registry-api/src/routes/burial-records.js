const routes = require('express').Router();

routes.get('/', (req,res) => {
    res.status(200);
    res.send("Hello Burial Records");
})

module.exports = routes;