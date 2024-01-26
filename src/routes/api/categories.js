const express = require('express');

const categoriesController = require('../../controllers/api/categoriesController');

const router = express.Router();

router.get('/', categoriesController.list);
router.get('/:id', categoriesController.detail);

module.exports = router;