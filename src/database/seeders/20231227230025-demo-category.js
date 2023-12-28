'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
     await queryInterface.bulkInsert('categories', 
     [
      {
       name: 'futbol',
      },
      {
        name: 'rugby',
       },
       {
        name: 'tenis',
       },
       {
        name: 'basquet',
       },
       {
        name: 'voley',
       },
       {
        name: 'golf',
       },
       {
        name: 'handball',
       },
       {
        name: 'hockey',
       },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('categories', null, {});

  }
};
