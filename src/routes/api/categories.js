const express = require('express');

const categoriesController = require('../../controllers/api/categoriesController');

const router = express.Router();

router.get('/', categoriesController.list);

module.exports = router;