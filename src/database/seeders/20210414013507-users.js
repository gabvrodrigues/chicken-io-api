'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', 
    [
      {
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: '$2y$12$Occwz5c53FmyFf8MdPjCH.80mTt1JoepL/xjcn3m1vKdfFtjnqlA6 ',
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
