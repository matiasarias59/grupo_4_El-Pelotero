const path = require('path');
const fs = require('fs');

const db = require('../database/models');
const { Op } = require('sequelize');

const productsFilePath = path.join(__dirname, '../data/products.json');
function getProducts() {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller = {
    products: async (req, res) => {
        try {
            const products = await db.Product.findAll( { include: ['images'] } );
            res.render('products/allProducts', { products });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    create: async (req, res) => {
        try {
            const brands = await db.Brand.findAll();
            const categories = await db.Category.findAll();
            res.render('products/createProduct', { brands, categories });
        } catch (error) {
            res.status(500).send(error);
        }
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
    },
    productDetail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, { include: ['images', 'brand', 'category'] });
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.render('products/productDetail', { product });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    edit: async (req, res) => {
        try {
            const productToEdit = await db.Product.findByPk(req.params.id, { include: ['brand', 'category'] });
            const brands = await db.Brand.findAll();
            const categories = await db.Category.findAll();
            res.render('products/editProduct', { productToEdit, brands, categories });
        } catch (error) {
            res.status(500).send(error);
        }
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
    destroy: async (req, res) => {
        try {
            await db.ProductImages.destroy({ where: { products_id: req.params.id } });
            await db.Product.destroy({ where: { id: req.params.id } });
            res.redirect('/products');
        } catch (error) {
            return res.status(500).send(error);
        }
        
    }
};

module.exports = controller;