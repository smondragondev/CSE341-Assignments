const { body, validationResult } = require('express-validator')
const burialRecordValidationRules = () => {
    return [
        body('firstName')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .withMessage('It should be a string'),
        body('lastName')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .withMessage('It should be a string'),
        body('dateOfBirth')
            .trim()
            .escape()
            .isDate(),
        body('dateOfDeath')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isDate(),
        body('intermentDate')
            .trim()
            .escape()
            .isDate(),
        body('cemeteryName')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .withMessage('It should be a string'),
        body('section')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .withMessage('It should be a string'),
        body('block')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .withMessage('It should be a string'),
        body('lotNumber')
            .trim()
            .escape()
            .isInt()
            .withMessage('It should be a integer'),
        body('graveNumber')
            .trim()
            .escape()
            .isInt()
            .withMessage('It should be a integer'),
        body('lat')
            .trim()
            .escape()
            .isDecimal()
            .withMessage('It should be a decimal'),
        body('lng')
            .trim()
            .escape()
            .isDecimal()
            .withMessage('It should be a decimal'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = { 
    burialRecordValidationRules,
    validate,
}