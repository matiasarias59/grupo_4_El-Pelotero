const {User} = require('../../database/models');


const controller = {

  list: async (req, res) => {
    try {
      const users = await User.findAll({attributes: {exclude: ['password']}});
      return res.json({
        meta: {
          status: 200,
          length: users.length,
          url: req.originalUrl,
        },
        data: users,
      });
    } catch (error) {
      res.status(500).json({error});
    }
  },
  last: async (req, res) => {
    try {
      const user = await User.findOne({attributes: {exclude: ['password']}, include: ['rol'], order: [['id', 'DESC']]});
      return res.json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: user,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  },
  detail: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId, {attributes: {exclude: ['password']}});
      if (!user) {
        return res.status(404).json({ 
          meta: {
              status: 404,
              error: 'User not found'
          } 
      });
      }
      return  res.json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: user,
      });
    } catch (error) {
      res.status(500).send({error});
    }
  }
};

module.exports = controller;