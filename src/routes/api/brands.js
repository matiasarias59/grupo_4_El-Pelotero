const express = require('express');

const brandsController = require('../../controllers/api/brandsController');

const router = express.Router();

router.get('/', brandsController.list);
router.get('/:id', brandsController.detail);

module.exports = router;