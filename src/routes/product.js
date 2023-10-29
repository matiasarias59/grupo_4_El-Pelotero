const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.products);

router.get('/create', productController.create);
router.post('/', productController.store);

router.get('/:id', productController.productDetail);

router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);

router.delete('/:id', productController.destroy);

module.exports = router;