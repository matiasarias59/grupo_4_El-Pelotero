'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
    await queryInterface.bulkInsert('products', 
    [
     {
      name: 'Pelota Topper Retro II Campo',
      description: 'La Pelota Topper Retro II Campo evoca la nostalgia del futbol de forma pura y simple. Confeccionada con mucha atención a los detalles. Su diseño en blanco con 32 costuras visibles y una textura en relieve,le otorga una apariencia y sensación auténticamente retro. Fabricada con materiales de alta calidad perfecta para partidos informales o para esos pases y tiros con amigos',
      brands_id: 1,
      price: 22000,
      quantity: 10,
      categories_id: 1,      
     },
     {
      name: 'Pelota Gilbert Midi UAR',
      description: 'La pelota Gilbert Midi UAR es una réplica de la que usan Los Pumas en sus partidos como local. Su tamaño Número 2 de 24cm es ideal para chicos entre 6 a 12 años que estén iniciando sus primeros pasos en el deporte,',
      brands_id: 2,
      price: 1300,
      quantity: 9,
      categories_id: 3,      
     },
     {
      name: 'Pelota Basquet Molten GG7X',
      description: 'El Molten GGX es un balón de baloncesto acolchado de cuero sintético que ha sido aprobado por la FIBA ​​y es el balón oficial de la BBL y otras ligas profesionales de diferentes lugares del mundo. Esta pelota de interior tiene una serie de excelentes características de diseño que incluyen tecnología X, construcción de cantos rodados paralelos y tecnología de doble cojín de carcasa suave. Ofrece un alto rebote, tiene costuras completamente planas y una superficie plana de guijarros y cuenta con el diseño patentado de 12 paneles de Giugiaro',
      brands_id: 3,
      price: 17000,
      quantity: 5,
      categories_id: 4,      
     },
     {
      name: 'Pelotas De Tenis Boca Juniors Wilson Edición Limitada',
      description: 'Compartí tu amor por Boca en cada saque con esta edición limitada de pelotas de tenis WILSON',
      brands_id: 4,
      price: 10000,
      quantity: 12,
      categories_id: 3,      
     },
     {
      name: 'Pelota adidas Al Rihla Competition',
      description: 'Palpita el Mundial con la Pelota adidas Al Rihla Competition. Cosida a mano, precisa, con un exterior de TPU y una textura que optimiza el efecto de giro y la precisión. Inspirada en la pelota oficial de la Copa Mundial, cuenta con una cámara de butilo que mantiene la forma. Sentí la pasión por la selección con los estampados vibrantes que abren paso a un mundo de posibilidades para los equipos competidores de Qatar 2022.',
      brands_id: 6,
      price: 45000,
      quantity: 20,
      categories_id: 1,      
     },
     
     
     
     
      
   ], {});
   
 },

 async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('products', null, {});

 }
};