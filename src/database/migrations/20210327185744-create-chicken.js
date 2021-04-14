'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chickens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      food_quantity: {
        type: Sequelize.FLOAT
      },
      meals_per_day: {
        type: Sequelize.FLOAT
      },
      path_image: {
        type: Sequelize.STRING
      },
      tag_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'tags',
          key: 'id'
        },
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }

    }, { underscored: true });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chickens');
  }
};