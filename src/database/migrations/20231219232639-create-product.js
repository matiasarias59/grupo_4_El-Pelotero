'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(128)
        
      },
      description: {
        type: Sequelize.TEXT
      },
      brands_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'brands'
          },
          key:'id'
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(11,2)
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      categories_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categories'
          },
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};