'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        
    
    await queryInterface.bulkInsert('product_images', 
    [
     {
        url: 'pelota-topper.png',
        default: true,
        products_id: 1
     },
     {
        url: 'pelota-gilbert.jpeg',
        default: true,
        products_id: 2
      },
      {
        url: 'pelota-basket-molten-g7.png',
        default: true,
        products_id: 3
      },
      {
        url: 'pelota-tenis-boca.png',
        default: true,
        products_id: 4
      },
      {
        url: 'pelota-futbol-adidas.png',
        default: true,
        products_id: 5
      },
      
   ], {});
   
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('product_images', null, {});

  }
};
