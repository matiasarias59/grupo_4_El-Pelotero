const User = require('../models/Users');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const {validationResult} = require('express-validator');
//const Users = require ('../models/Users')

const controller = {

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
            avatar: req.file?.filename || 'defaultPic.jpg'
        }

        delete newUser.confirmPassword;
        delete newUser.termsCheck;

        User.create(newUser);

        res.redirect('/');
    },
   
    
    login: (req, res) => {
        res.render('./users/login');
    },
    
    loginProcess: (req, res) => {

        const userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
           const isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = {...userToLogin};
                if(req.body.remember_me){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000*60) *2});
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
    },

logout : (req,res)=> {
    req.session.destroy()
    return res.redirect('/')
},

account : (req,res)=> {
    const user = {...req.session.userLogged}
    return res.render('./users/account', {user});

}

};

module.exports = controller;
