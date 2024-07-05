const { check, validationResult } = require('express-validator');

exports.matiereValidation = [
    check('nom')
        .isString()
        .withMessage(`Le champ 'nom' de la matière doit être une chaîne de caractères!`)
        .notEmpty()
        .withMessage(`Le champ 'nom' de la matière ne doit pas être vide!`),
    check('description')
        .isString()
        .withMessage(`Le champ 'description' de la matière doit être une chaîne de caractères!`)
];

exports.matiereValidationError = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({ errors: extractedErrors });
};
