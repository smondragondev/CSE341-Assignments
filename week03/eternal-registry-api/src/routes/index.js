const routes = require('express').Router();
const burialRecords = require('./burial-records');

routes.get('/', (req,res)=> {
    res.send("Hello World!");
})

routes.use('/burial-records', burialRecords);

module.exports = routes;