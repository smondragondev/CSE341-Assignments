require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'localhost'
const isDevelopment = process.env.ENV === 'development';
const schema = isDevelopment ? 'http' : 'https';
const host = isDevelopment ? `${domain}:${port}` : `${domain}`;

console.log('ENV:', process.env.ENV, '| isDevelopment:', isDevelopment);
const doc = {
    info: {
        title: 'Burial Record API',
        description: 'This API is a CRUD of Burial Records'
    },
    host: host,
    schemes: [schema],
    definitions: {
        CreateUpdateBurialRecord: {
            $firstName: 'Margaret',
            $lastName: 'Thatcher',
            dateOfBirth: '1928-04-15',
            $dateOfDeath: '2023-11-02',
            intermentDate: '2023-11-08',
            $cemeteryName: 'Rosewood Cemetery',
            $section: 'Heritage Row',
            $block: 'C',
            lotNumber: 154,
            graveNumber: 4,
            lat: 1.123,
            lng: -1.232
        },
        CreateUpdateWorkOrder:{
            $type: 'maintenance',
            $scheduledDate: '2026-04-15',
            $status: 'pending',
            $assignedTo: 'Grounds Crew A'
        },
        CreateUpdateUser: {
            $firstName: 'Margaret',
            $lastName: 'Thatcher',
            $email: 'example@email.com',
            $password: '123456asdzxAs**',
        },
        LoginPassword: {
            $email: 'example@email.com',
            $password: '123456asdzxAs**',
        }
    }
}

const outputFile = './swagger.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen(outputFile, routes, doc);