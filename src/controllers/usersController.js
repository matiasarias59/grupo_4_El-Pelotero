const User = require('../models/Users');

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
            avatar: req.file.filename
        }

        User.create(newUser);

        res.redirect('/');
        //console.log(req)
       // res.send(req.body)

    },

}

module.exports = controller;