const db = require('../../database/models');

const controller = {
  list: async (req, res) => {
    try {
      const brands = await db.Brand.findAll();
      return res.json({
        meta: {
          status: 200,
          length: brands.length,
          url: req.originalUrl,
        },
        data: brands,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  },
  detail: async (req, res) => {
    try {
      const brand = await db.Brand.findByPk(req.params.id, { include: ['products'] });
      if (!brand) {
        return res.status(404).json({ 
            meta: {
                status: 404,
                error: 'Brand not found'
            } 
        });
      }
      return  res.json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: brand,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }
};

module.exports = controller;
