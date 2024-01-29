const {body} = require('express-validator');

const createUserValidation = [

    body('first_name').
    notEmpty().withMessage('El campo Nombre no puede estar vacio'),

    body('last_name').
    notEmpty().withMessage('El campo Apellido no puede estar vacio'),

    body('birth_date').
    notEmpty().withMessage('El campo Fecha de Nacimiento no puede estar vacio'),

    body('email').
    notEmpty().withMessage('El campo email no puede estar vacio').
    isEmail().withMessage('Debes introducir un correo electronico valido'),

    body('password').
    notEmpty().withMessage('El campo contraseña no puede estar vacio').
    isLength({min: 6}).withMessage('Contraseña demaciado corta'),


    /* body('confirmPassword').
    notEmpty().withMessage('El campo contraseña no puede estar vacio') */
   
  

];

module.exports = {createUserValidation}