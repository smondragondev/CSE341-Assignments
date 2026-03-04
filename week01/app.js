const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./src/routes'));

app.listen(port, () => {
    console.log('Web Server is listening at port ' + port);
});