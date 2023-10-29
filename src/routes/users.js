const express = require('express');

const upload = require('../middlewares/multerMiddleware');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/login', usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/register', usersController.register);

router.post('/register', upload.single('avatar'), usersController.registerProcess);

module.exports = router;