const express = require('express');
const {uploadProductPic} = require('../middlewares/multerMiddleware');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.products);

router.get('/create', productController.create);
router.post('/', uploadProductPic.single('picture'), productController.store);

router.get('/:id', productController.productDetail);

router.get('/:id/edit', productController.edit);
router.put('/:id', uploadProductPic.single('picture'), productController.update);

router.delete('/:id', productController.destroy);

module.exports = router;