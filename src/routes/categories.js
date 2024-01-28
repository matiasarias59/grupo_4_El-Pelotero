const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.get('/', authMiddleware, categoriesController.list);
router.get('/create', authMiddleware, categoriesController.createFrom);
router.post('/', authMiddleware, categoriesController.storage);
router.get('/:id/edit', authMiddleware, categoriesController.editForm);
router.put('/:id', authMiddleware, categoriesController.update)

module.exports = router;