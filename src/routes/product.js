const express = require('express');
const {uploadProductPic} = require('../middlewares/multerMiddleware');
const productController = require('../controllers/productController');
const {createProductValidation} = require('../middlewares/productValidations');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.products);

router.get('/create', authMiddleware, productController.create);
router.post('/', authMiddleware, uploadProductPic.single('picture'), createProductValidation, productController.store);

router.get('/:id', productController.productDetail);

router.get('/:id/edit', authMiddleware, productController.edit);
router.put('/:id', authMiddleware, uploadProductPic.single('picture'), createProductValidation, productController.update);

router.delete('/:id', authMiddleware, productController.destroy);

module.exports = router;