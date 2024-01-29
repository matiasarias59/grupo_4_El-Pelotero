const express = require('express');

const brandsController = require('../../controllers/api/brandsController');

const router = express.Router();

router.get('/', brandsController.list);

module.exports = router;