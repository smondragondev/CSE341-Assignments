const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./src/models');

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});