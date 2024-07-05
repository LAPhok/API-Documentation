const { check, validationResult } = require('express-validator');

exports.evaluationValidation = [
    check('userId')
        .isNumeric()
        .withMessage(`Le champ 'userId' doit être un nombre!`),
    check('note')
        .isNumeric()
        .withMessage(`Le champ 'note' doit être une chaîne de caractères!`)
        .notEmpty()
        .withMessage(`Le champ 'note' ne doit pas être vide!`)
        .isFloat({ min: 0, max: 100 })
        .withMessage(`Le champ 'note' doit être compris entre 0 et 100!`),
];

exports.evaluationValidationError = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({ errors: extractedErrors });
};
