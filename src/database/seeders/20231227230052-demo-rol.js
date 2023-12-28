'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
    await queryInterface.bulkInsert('roles', 
    [
     {
      name: 'administrador',
     },
     {
       name: 'vendedor',
      },
      {
        name: 'comprador',
       },
      
   ], {});
   
 },

 async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('roles', null, {});

 }
};