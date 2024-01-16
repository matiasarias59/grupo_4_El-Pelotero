const express = require('express');

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/multerMiddleware');
const {createUserValidation} = require('../middlewares/userValidations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/login', guestMiddleware, usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/logout', authMiddleware, usersController.logout);

router.get('/register',guestMiddleware, usersController.register);

router.post('/register', upload.single('avatar'), createUserValidation, usersController.registerProcess);

router.get('/account', authMiddleware, usersController.account);

router.get('/users', authMiddleware, usersController.index);
router.get('/users/:id/edit', authMiddleware, usersController.edit);
router.put('/users/:id/edit', authMiddleware, usersController.update);
//router.get('/users/:id', authMiddleware, usersController.show);

module.exports = router;