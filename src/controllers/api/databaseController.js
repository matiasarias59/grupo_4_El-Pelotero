const db = require('../../database/models');

const controller = {
    info: async (req, res) => {
        try {
            res.send({
                prod_count: await db.Product.count(),
                user_count: await db.User.count(),
                cat_count: await db.Category.count(),
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
};

module.exports = controller;
