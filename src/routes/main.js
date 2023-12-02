const express = require('express');
const mainController= require('../controllers/mainController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', mainController.index);
//router.get('/login', mainController.login);
//router.get('/register', mainController.register);
router.get('/cart', authMiddleware, mainController.cart);
//router.post('/login', mainController.loginUser);
//router.post('/register', mainController.createUser);




module.exports = router;
