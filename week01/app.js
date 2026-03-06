const express = require('express');
const mongodb = require('./src/data/database');

const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./src/routes'));

mongodb.initDb((err) => {
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, () => {
            console.log('Database is listening and Web Server is listening at port ' + port);
        });
    }
});
