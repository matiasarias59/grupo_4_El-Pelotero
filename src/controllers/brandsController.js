const { Brand } = require('../database/models');

const controller = {
  list: async (req, res) => {
    try {
      const brands = await Brand.findAll({ order: ['name'] });

      return res.render('./brands/allBrands', { brands });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  createFrom: async (req, res) => {
    return res.render('./brands/createBrand');
  },
  storage: async (req, res) => {
    try {
      await Brand.create({ name: req.body.name });
      return res.redirect('/brands');
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  editForm: async (req, res) => {
    try {
        const brandToEdit = await Brand.findByPk(req.params.id);

        return res.render('./brands/editBrand', {brandToEdit});
    } catch (error) {
        return res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
        await Brand.update({name:req.body.name}, {where: {id: req.params.id}});
        res.redirect('/brands');
        
    } catch (error) {
        return res.status(500).send(error);
        
    }
  }
};

module.exports = controller;
