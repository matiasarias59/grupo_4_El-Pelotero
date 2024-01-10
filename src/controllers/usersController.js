const db = require('../database/models');
const User = db.User;
const Rol = db.Rol;
const { Op } = require('sequelize');
//const User = require('../models/Users');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const {validationResult} = require('express-validator');
//const Users = require ('../models/Users')

const controller = {

    register: (req, res) => {

        res.render('./users/register');
        
    },

    registerProcess: async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.render('./users/register', {
              errors: errors.mapped(),
              oldData: req.body,
            });
          }
    
          const { first_name, last_name, birth_date, roles_id, ...otherFields } = req.body;
    
          const newUser = {
            first_name,
            last_name,
            birth_date,
            roles_id,
            ...otherFields,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file?.filename || 'defaultPic.jpg',
          };
    
          delete newUser.confirmPassword;
          delete newUser.termsCheck;
    
          const createdUser = await User.create(newUser);
    
          res.redirect('/');
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
   
    
    login: (req, res) => {
        res.render('./users/login');
    },
    
    loginProcess: async (req, res) => {
        try {
            const userToLogin = await User.findOne({
                where: { email: req.body.email }
            });

            if (userToLogin) {
                const isOkThePassword = await bcrypt.compare(req.body.password, userToLogin.password);
                if (isOkThePassword) {
                    delete userToLogin.password;
                    req.session.userLogged = { ...userToLogin };
                    if (req.body.remember_me) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2, httpOnly: true });
                    }
                    return res.redirect('/');
                }
                return res.render('./users/login', {
                    errors: {
                        email: {
                            msg: 'Las credenciales son inválidas'
                        }
                    }
                });
            }

            console.log(req.session);
        } catch (error) {
            console.error('Error al procesar el inicio de sesión:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
logout : (req,res)=> {
    req.session.destroy()
    res.clearCookie('userEmail')
    return res.redirect('/')
},

account: (req, res) => {
    if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }

    const user = { ...req.session.userLogged };
    return res.render('./users/account', { user });
}

};

module.exports = controller;
