const db = require('../../database/models');

const controller = {
  list: async (req, res) => {
    try {
      const brands = await db.Brand.findAll({
        include: [{
          association: 'products',
          include: ['images']
        }]
      });
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
  }
};

module.exports = controller;
