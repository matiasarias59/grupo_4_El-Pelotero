const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const brandsController = require('../controllers/brandsController');

const router = express.Router();

router.get('/', authMiddleware, brandsController.list);
router.get('/create', authMiddleware, brandsController.createFrom);
router.post('/', authMiddleware, brandsController.storage);
router.get('/:id/edit', authMiddleware, brandsController.editForm);
router.put('/:id', authMiddleware, brandsController.update)

module.exports = router;