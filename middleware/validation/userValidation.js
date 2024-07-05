const {check, validationResult} = require('express-validator');

exports.userValidation= [
    check('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Le champ 'username' doit pas etre vide!`)
    .isLength({min:4, max:20})
    .withMessage(`Le champ 'username' doit etre compris entre 4 a 20 caractere!`),
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Le champ 'password' doit pas etre vide!`)
    .isLength({min:4, max:20})
    .withMessage(`Le champ 'password' doit etre compris entre 4 a 20 caractères!`),
];

exports.userValidationError = (req, res, next) =>{
        const result = validationResult(req).array();
        console.log(result);

        if(!result.length) {
            return next();
        }
        else{
        const error = result[0].msg;
        res.status(400).json({message: error})
        }
}


