const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/product-detail', productController.productDetail);


module.exports = router;