const fs = require('fs');
const path = require('path');


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
        console.log(req.body);
        console.log(req.file)
        res.send(req.file)

    },

}

module.exports = controller;