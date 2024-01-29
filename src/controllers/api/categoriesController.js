const db = require('../../database/models');

const controller = {
  list: async (req, res) => {
    try {
      const categories = await db.Category.findAll({
        include: [{
          association: 'products',
          include: ['images']
        }]
      });
      return res.json({
        meta: {
          status: 200,
          length: categories.length,
          url: req.originalUrl,
        },
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }
};

module.exports = controller;
