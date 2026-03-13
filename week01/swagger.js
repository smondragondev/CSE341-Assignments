const swaggerAutogen = require('swagger-autogen')();
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'localhost'
const isDevelopment = process.env.ENV == 'development';
const host = isDevelopment ?  `${domain}` : `${domain}:${port}`;

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This API is a CRUD of contacts'
    },
    host: host
}

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen(outputFile,routes,doc);