'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', 
    [
      {
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: bcrypt.hashSync('123456', 8),
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
