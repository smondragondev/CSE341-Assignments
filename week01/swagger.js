const swaggerAutogen = require('swagger-autogen')();
const port = process.env.PORT || 3000;

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This API is a CRUD of contacts'
    },
    host: `localhost:${port}`
}

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen(outputFile,routes,doc);