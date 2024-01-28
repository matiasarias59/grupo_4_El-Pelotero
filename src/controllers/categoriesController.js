const { Category } = require('../database/models');

const controller = {
  list: async (req, res) => {
    try {
      const categories = await Category.findAll({ order: ['name'] });

      return res.render('./categories/allCategories', { categories });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  createFrom: async (req, res) => {
    return res.render('./categories/createCategory');
  },
  storage: async (req, res) => {
    try {
      await Category.create({ name: req.body.name });
      return res.redirect('/categories');
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  editForm: async (req, res) => {
    try {
        const categoryToEdit = await Category.findByPk(req.params.id);

        return res.render('./categories/editCategory', {categoryToEdit});
    } catch (error) {
        return res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
        await Category.update({name:req.body.name}, {where: {id: req.params.id}});
        res.redirect('/categories');
        
    } catch (error) {
        return res.status(500).send(error);
        
    }
  }
};

module.exports = controller;
