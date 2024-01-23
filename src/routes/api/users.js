const express = require('express');
const usersController = require('../../controllers/api/usersController');

const router = express.Router();

router.get('/', usersController.list);
router.get('/:id', usersController.detail);


module.exports = router;