const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Op } = require('sequelize');

const controller = {
    products: async (req, res) => {
        try {
            const search = req.query.search || "";
            const products = await db.Product.findAll({ 
                include: ['images'],
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                } 
            });
            return res.render('products/allProducts', { products, search });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    create: async (req, res) => {
        try {
            const brands = await db.Brand.findAll();
            const categories = await db.Category.findAll();
            return res.render('products/createProduct', { brands, categories });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    store: async (req, res) => {
        try {
            const newProduct = {...req.body};
            const createdProduct = await db.Product.create(newProduct);

            if(req.file){

                const newImage = {
                    url: req.file.filename,
                    default: true,
                    products_id: createdProduct.id,
                }
                await db.ProductImages.create(newImage);
            }

            return res.redirect('/products');
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    productDetail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, { include: ['images', 'brand', 'category'] });
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            return res.render('products/productDetail', { product });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    edit: async (req, res) => {
        try {
            const brands = await db.Brand.findAll();
            const categories = await db.Category.findAll();

            const productToEdit = await db.Product.findByPk(req.params.id, { include: ['brand', 'category'] });

            return res.render('products/editProduct', { productToEdit, brands, categories });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    update: async (req, res) => {
        try {
            const editProduct = {
                ...req.body
            };
            await db.Product.update(editProduct, { where: { id: req.params.id } });
            
            if(req.file){
                const oldPicture = await db.ProductImages.findOne(
                        {
                            where:{
                                products_id: req.params.id
                            }
                        }
                );
                
                try {
                    
                    fs.rmSync(path.join(__dirname, '../public/img/products', oldPicture.url));
                    
                } catch (error) {
                    console.log(error);
                }
                await db.ProductImages.destroy({where: {id: oldPicture.id}});
                
                const newImage = {
                    url: req.file.filename,
                    default: true,
                    products_id: req.params.id,
                }
                await db.ProductImages.create(newImage);
            }

            return res.redirect('/products');
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    destroy: async (req, res) => {
        try {
            const oldPicture = await db.ProductImages.findOne(
                {
                    where:{
                        products_id: req.params.id
                    }
                }
            );
            if (oldPicture) {                        
                try {
                
                    fs.rmSync(path.join(__dirname, '../public/img/products', oldPicture.url));
                
                } catch (error) {
                    console.log(error);
                }
                await db.ProductImages.destroy({ where: { id: oldPicture.id } });
            }
            
            await db.Product.destroy({ where: { id: req.params.id } });
            
            return res.redirect('/products');
        
        } catch (error) {
            return res.status(500).send(error);
        }
        
    }
};

module.exports = controller;