const db = require('../../database/models');

const controller = {
  list: async (req, res) => {
    try {
      const categories = await db.Category.findAll();
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
  },
  detail: async (req, res) => {
    try {
      const category = await db.Category.findByPk(req.params.id, { include: ['products'] });
      if (!category) {
        return res.status(404).json({ 
            meta: {
                status: 404,
                error: 'Category not found'
            } 
        });
      }
      return  res.json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: category,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }
};

module.exports = controller;
