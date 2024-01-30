const {body} = require('express-validator');

const createProductValidation = [

    body('name').
    notEmpty().withMessage('El campo Nombre no puede estar vacio'),

    body('brands_id').
    notEmpty().withMessage('El campo Marca no puede estar vacio').
    isNumeric().withMessage('Dato Invalido'),

    body('categories_id').
    notEmpty().withMessage('El campo Categoria no puede estar vacio').
    isNumeric().withMessage('Dato Invalido'),

    body('price').
    notEmpty().withMessage('El campo Precio no puede estar vacio').
    isNumeric().withMessage('Debes ingresar un valor válido'),

    body('quantity').
    notEmpty().withMessage('El campo Cantidad no puede estar vacio').
    isNumeric().withMessage('Debes ingresar un valor válido'),

    body('description').
    notEmpty().withMessage('El campo Descripción no puede estar vacio'),

  

];

module.exports = {createProductValidation}