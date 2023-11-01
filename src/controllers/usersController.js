const User = require('../models/Users');
const bcrypt = require('bcryptjs');

const {validationResult} = require('express-validator');


const controller = {

    login: (req, res) => {
        res.render('./users/login');
    },

    loginProcess: (req, res) => {
        res.redirect('/');
    }, 

    register: (req, res) => {
      
        res.render('./users/register');
        
    },

    registerProcess: (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.render("./users/register", {
            errors: errors.mapped(),
            oldData: req.body,
          });
        }

        const newUser = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        delete newUser.confirmPassword;
        delete newUser.termsCheck;

        User.create(newUser);

        res.redirect('/');
    },

}

module.exports = controller;
