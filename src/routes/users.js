const express = require('express');

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/multerMiddleware');
const {createUserValidation} = require('../middlewares/userValidations');

const router = express.Router();

router.get('/login', usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/register', usersController.register);

router.post('/register', upload.single('avatar'), createUserValidation, usersController.registerProcess);

module.exports = router;