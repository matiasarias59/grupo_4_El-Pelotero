'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
    await queryInterface.bulkInsert('brands', 
    [
     {
      name: 'Topper',
     },
     {
       name: 'Gilbert',
      },
      {
       name: 'Molten',
      },
      {
       name: 'Wilson',
      },
      {
       name: 'Dimple',
      },
      {
       name: 'Adidas',
      },
      {
       name: 'Spalding',
      },
      {
       name: 'Gold',
      },
      {
        name: 'Penalty',
       },
       {
        name: 'Dribbling',
       },
       {
        name: 'Nike',
       },
   ], {});
   
 },

 async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('brands', null, {});

 }
};
