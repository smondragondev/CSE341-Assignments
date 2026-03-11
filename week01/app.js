const express = require('express');
const mongodb = require('./src/data/database');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


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
