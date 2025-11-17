const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/appError.util");



const checkResult = (req, res, next) => {
    const errors = validationResult(req)

    const message = errors.array().map(error => error.msg).join(', ')
     
    if(!errors.isEmpty()){
       return next( new AppError(message, 400))
    }

    next() 
}

const createUserValidator = [ 
    body('name').notEmpty().withMessage('el campo nombre no puede estar vacío'), 
    body('lastName').notEmpty().withMessage('el campo apellido no puede estar vacío'), 
    body('age').isNumeric().withMessage('la edad debe ser un numero'), 
    body('email').isEmail().withMessage('debes proporcionar un correo válido'), 
    body('password')
        .isLength({ min: 8})
        .withMessage('la contraseña debe tener minimo 8 caracteres')
        .isAlphanumeric()
        .withMessage('la contraseña debe tener numeros y letras'),
    checkResult,
]

module.exports = { createUserValidator }