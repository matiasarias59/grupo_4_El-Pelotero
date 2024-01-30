const db = require('../../database/models');

const controller = {
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll({include: ['brand', 'category']});
      return res.json({
        meta: {
          status: 200,
          length: products.length,
          url: req.originalUrl,
        },
        data: products,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  },
  last: async (req, res) => {
    try {
      const product = await db.Product.findOne({ include: ['images', 'brand', 'category'], order: [['id', 'DESC']] });
      return res.json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: product,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  },
  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, { include: ['images', 'brand', 'category'] });
      if (!product) {
        return res.status(404).json({ 
            meta: {
                status: 404,
                error: 'Product not found'
            } 
        });
      }
      return  res.json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: product,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }
};

module.exports = controller;
