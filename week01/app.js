const express = require('express');
const mongodb = require('./src/data/database');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'localhost'
const isDevelopment = process.env.ENV == 'development';
const origin = isDevelopment ?  `http://${domain}:${port}` : `https://${domain}`;
var corsOptions = {
    origin: origin
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/', require('./src/routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

