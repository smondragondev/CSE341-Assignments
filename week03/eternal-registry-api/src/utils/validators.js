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

const userValidationRules = () => {
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
        body('email')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isEmail(),
        body('password')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isStrongPassword({
                minLength: 10,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ]
}

const loginValidationRules = () => {
    return [
        body('email')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isEmail(),
        body('password')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString(),            
        ]
};

const workOrderValidationRules = () => {
    return [
        body('type')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .withMessage('It should be a string')
            .custom((type) => {
                if (type !== 'maintenance' && type !== 'interment' && type !== 'other') {
                    throw new Error("Please use a correct type: maintenance, interment or other")
                }
                return true;
            }),
        body('scheduledDate')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isDate(),
        body('status')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .custom((status) => {
                if (status !== 'pending' && status !== 'completed' && status !== 'canceled') {
                    throw new Error("Please use a correct status: pending, completed or canceled")
                }
                return true;
            }),
        body('assignedTo')
            .notEmpty()
            .withMessage('It should be not Empty')
            .trim()
            .escape()
            .isString()
            .withMessage('It should be a string'),
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
    userValidationRules,
    workOrderValidationRules,
    loginValidationRules,
    validate,
}