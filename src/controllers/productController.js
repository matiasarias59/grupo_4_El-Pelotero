const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

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
            return res.status(500).render('errorView',{ message: 'Parece que hay un error en el servidor. Por favor intenta más tarde' });
        }
    },
    create: async (req, res) => {
        try {
            const brands = await db.Brand.findAll({order:['name']});
            const categories = await db.Category.findAll({order:['name']});
            return res.render('products/createProduct', { brands, categories });
        } catch (error) {
            return res.status(500).render('errorView',{ message: 'Parece que hay un error en el servidor. Por favor intenta más tarde' });
        }
    },
    store: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const brands = await db.Brand.findAll({order:['name']});
                const categories = await db.Category.findAll({order:['name']});
    
                return res.render('./products/createProduct', {
                    brands: brands,
                    categories: categories,
                    errors: errors.mapped(),
                    oldData: req.body,
                });
            }

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
            return res.status(500).render('errorView',{ message: 'Parece que hay un error en el servidor. Por favor intenta más tarde' });
        }
    },
    productDetail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, { include: ['images', 'brand', 'category'] });
            if (!product) {
                return res.status(404).render('errorView',{ message: 'Producto no encontrado' });
            }
            return res.render('products/productDetail', { product });
        } catch (error) {
           return res.status(500).render('errorView',{ message: 'Parece que hay un error en el servidor. Por favor intenta más tarde' });
        }
    },
    edit: async (req, res) => {
        try {
            const brands = await db.Brand.findAll({order:['name']});
            const categories = await db.Category.findAll({order:['name']});

            const productToEdit = await db.Product.findByPk(req.params.id, { include: ['brand', 'category'] });

            if (!productToEdit) {
                return res.status(404).render('errorView',{ message: 'Producto no encontrado' });
            }

            return res.render('products/editProduct', { productToEdit, brands, categories });
        } catch (error) {
            return res.status(500).render('errorView',{ message: 'Parece que hay un error en el servidor. Por favor intenta más tarde' });
        }
    },
    update: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const brands = await db.Brand.findAll({order:['name']});
                const categories = await db.Category.findAll({order:['name']});
                const productToEdit = await db.Product.findByPk(req.params.id, { include: ['brand', 'category'] });
                
                return res.render('./products/editProduct', {
                    productToEdit: productToEdit,
                    brands: brands,
                    categories: categories,
                    errors: errors.mapped(),
                    oldData: req.body,
                });
            }

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
                    

                        fs.rmSync(path.join(__dirname, '../public/img/products', oldPicture?.url));
                    
                    
                } catch (error) {
                    console.log(error);
                }
                if(oldPicture){

                    await db.ProductImages.destroy({where: {id: oldPicture.id}});
                }
                
                const newImage = {
                    url: req.file.filename,
                    default: true,
                    products_id: req.params.id,
                }
                console.log(newImage)
                await db.ProductImages.create(newImage);
            }

            return res.redirect('/products');
        } catch (error) {
            return res.status(500).render('errorView',{ message: 'Parece que hay un error en el servidor. Por favor intenta más tarde' });
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
                                        
                        fs.rmSync(path.join(__dirname, '../public/img/products', oldPicture?.url));
                
                
                } catch (error) {
                    console.log(error);
                }
            if(oldPicture){
                await db.ProductImages.destroy({ where: { id: oldPicture.id } });
            }
            }
            await db.Product.destroy({ where: { id: req.params.id } });
            
            return res.redirect('/products');
        
        } catch (error) {
            return res.status(500).render('errorView',{ message: 'Parece que hay un error en el servidor. Por favor intenta más tarde' });
        }
        
    }
};

module.exports = controller;