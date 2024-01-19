const db = require('../database/models');
const User = db.User;
const session = require('express-session');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const controller = {
  register: (req, res) => {
    res.render('./users/register');
  },

  registerProcess: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('entre aca');
        return res.render('./users/register', {
          errors: errors.mapped(),
          oldData: req.body,
        });
      }

      const newUser = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.file?.filename || 'defaultPic.jpg',
      };

      delete newUser.confirmPassword;
      delete newUser.termsCheck;

      await User.create(newUser);

      res.redirect('/users/login');
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).render('./users/register', {
          errors: error.errors.map((err) => ({
            param: err.path,
            msg: err.message,
          })),
          oldData: req.body,
        });
      }

      res.status(500).send('Error interno del servidor');
    }
  },
  index: async (req, res) => {
    try {
      const users = await User.findAll();
      res.render('./users/list', { users });
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  show: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.render('./users/user', { user });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  edit: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      res.render('./users/edit', { user });
    } catch (error) {
      console.error('Error al obtener el formulario de edición:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  update: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = req.body;
      await User.update(updatedUser, { where: { id: userId } });
      res.redirect(`/users/${userId}`);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  destroy: async (req, res) => {
    try {
      const userId = req.params.id;
      await User.destroy({ where: { id: userId } });
      req.session.destroy();
      res.redirect('/users/list');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  login: (req, res) => {
    res.render('./users/login');
  },

  loginProcess: async (req, res) => {
    try {
      const userToLogin = await User.findOne({
        where: { email: req.body.email },
      });

      if (userToLogin) {
        const isOkThePassword = await bcrypt.compare(req.body.password, userToLogin.password);
        if (isOkThePassword) {
          delete userToLogin.password;
          req.session.userLogged = { ...userToLogin };
          if (req.body.remember_me) {
            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 2, httpOnly: true });
          }
          return res.redirect('/');
        }
        return res.render('./users/login', {
          errors: {
            email: {
              msg: 'Las credenciales son inválidas',
            },
          },
        });
      }
    } catch (error) {
      console.error('Error al procesar el inicio de sesión:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('userEmail');
    return res.redirect('/');
  },

  account: (req, res) => {
    if (!req.session.userLogged) {
      return res.redirect('/users/login');
    }

    const user = { ...req.session.userLogged.dataValues };
    console.log(user);
    return res.render('./users/account', { user });
  },
};

module.exports = controller;