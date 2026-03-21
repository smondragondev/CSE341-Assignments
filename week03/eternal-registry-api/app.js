const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const createError = require('http-errors')
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const db = require('./src/models');

const domain = process.env.DOMAIN || 'localhost'
const isDevelopment = process.env.ENV == 'development';
const origin = isDevelopment ? `http://${domain}:${port}` : `https://${domain}`;
var corsOptions = {
    origin: origin
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./src/routes'));

db.mongoose
    .connect(db.url)
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

// 404 handler 
app.use((req,res,next) => {
    next(createError.NotFound());
})

// ERROR HANDLER

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});