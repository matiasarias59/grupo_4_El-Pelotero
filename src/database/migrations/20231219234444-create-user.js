'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull:false,
        type: Sequelize.TEXT
      },
      avatar: {
        allowNull:false,
        type: Sequelize.TEXT
      },
      birth_date: {
        allowNull:false,
        type: Sequelize.DATE
      },
      rol_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'roles'
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
    await queryInterface.dropTable('users');
  }
};