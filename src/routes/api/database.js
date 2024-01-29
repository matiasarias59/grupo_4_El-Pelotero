const express = require('express');

const categoriesController = require('../../controllers/api/databaseController');

const router = express.Router();

router.get('/', categoriesController.info);

module.exports = router;