const createError = require('http-errors');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    throw createError.Unauthorized("You must be logged in to access this resource.");
}