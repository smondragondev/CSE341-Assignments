const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Temple API - CSE341',
    description: 'An API to list and find temples.'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);