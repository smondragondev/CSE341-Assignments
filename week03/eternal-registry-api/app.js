const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
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

// WILDCARD
app.get('{*splat}', (req, res, next) => {
    if (req.path.startsWith('/api-docs')) {
        return next();
    }
    res.redirect('/api-docs');
})

db.mongoose
    .connect(db.url)
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});