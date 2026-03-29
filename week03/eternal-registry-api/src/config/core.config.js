const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;
const domain = process.env.DOMAIN || 'localhost';
const isDevelopment = process.env.ENV == 'development';
const origin = isDevelopment ? `http://${domain}:${port}` : `https://${domain}`;

module.exports = {
    origin,
};