const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const controller = {

    index: async (req, res) => {
        try {
            const products = await db.Product.findAll( { 
                include: ['images'],
                order: [['id', 'DESC']],
                limit: 4
            } );
            res.render('index', { products });
        } catch (error) {
            res.status(500).send(error);
        }
    },

/*     login: (req, res) => {
        res.render('users/login');
    }, */

 /*    register: (req, res) => {
        res.render('users/register');
    }, */

    cart: (req, res) => {
        res.render('users/cart');
    },

/*     createUser: (req, res) => {
        res.redirect('/');
    }, */
/*     loginUser: (req, res) => {
        res.redirect('/');
    },  */


};

module.exports = controller;