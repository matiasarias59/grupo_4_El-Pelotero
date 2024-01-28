'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
    await queryInterface.bulkInsert('users', 
    [
     {
      first_name: 'Matias',
      last_name: 'Arias',
      email: 'matiasarias59@gmail.com',
      password: '$2a$10$.QZrRdc1Hyhu0F50G1dgHeV.sC9zGcEsSA3q17ahRKl6TK6tfAZgm',
      avatar: 'defaultPic.jpg',
      birth_date: '1996-03-14',
      rol_id: 1,
     },
     {
      first_name: 'Cherie',
      last_name: 'Kleszinski',
      email: 'kleszinskit@facebook.com',
      password: 'uW7>s~/KU)=#Kit',
      avatar: 'avatar2.jpg',
      birth_date: '17/08/2007',
      rol_id: 3,
     },
     {
      first_name: 'Anitra',
      last_name: 'Haney',
      email: 'ahaneys@1688.com',
      password: 'pC6.KR`hf',
      avatar: 'avatar10.jpg',
      birth_date: '07/03/2009',
      rol_id: 2,
     },
     {
      
      first_name: 'Joel',
      last_name: 'Bonus',
      email: "joelsbonus@gmail.com",
      password: "$2a$10$GEddEwA3xK3QnUvRt14ppO3HhXTMpE5phrRg2Cc/TRDfuH.JrI.N.",
      avatar: "defaultPic.jpg",
      birth_date: '1992-07-07',
      rol_id: 1,
    }
     
     
      
   ], {});
   
 },

 async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('users', null, {});

 }
};