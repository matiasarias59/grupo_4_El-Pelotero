const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
function getProducts() {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller = {
    products: (req, res) => {
        const products = getProducts();
        res.render('products/allProducts', { products });
    },
    create: (req, res) => {
        res.render('products/createProduct');
    },
    store: (req, res) => {
        const products = getProducts();
        const productToCreate = {
            id: products[products.length - 1].id + 1,
            image: 'default-product.jpg',
            ...req.body
        };
        products.push(productToCreate);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
        res.redirect('/products');
    },
    productDetail: (req, res) => {
        const product = getProducts().find(prod => prod.id == req.params.id)
        if (!product) {
            return res.send('No existe este producto');
        }
        res.render('products/productDetail', { product });
    },
    edit: (req, res) => {
        const productToEdit = getProducts().find(prod => prod.id == req.params.id);
        res.render('products/editProduct', { productToEdit });
    },
    update: (req, res) => {
        const products = getProducts();
        const productIndex = products.findIndex(prod => prod.id == req.params.id);
        products[productIndex] = {
            ...products[productIndex],
            ...req.body
        };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
        res.redirect('/products');
    },
    destroy: (req, res) => {
        const products = getProducts();
        const productIndex = products.findIndex(prod => prod.id == req.params.id);
        products.splice(productIndex, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8')
        res.redirect('/products');
    }
};

module.exports = controller;