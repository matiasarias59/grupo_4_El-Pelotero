const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
function getProducts() {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller = {

    index: (req, res) => {
        const products = getProducts();
        res.render('index', { products });
    },

    login: (req, res) => {
        res.render('users/login');
    },

    register: (req, res) => {
        res.render('users/register');
    },

    cart: (req, res) => {
        res.render('users/cart');
    },

    createUser: (req, res) => {
        res.redirect('/');
    },
    loginUser: (req, res) => {
        res.redirect('/');
    }, 


};

module.exports = controller;