'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feeder_weight_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chicken_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'chickens',
          key: 'id'
        },
      },
      ate_food: {
        type: Sequelize.BOOLEAN
      },
      food_amount: {
        type: Sequelize.FLOAT
      },
      meals_per_day: {
        type: Sequelize.FLOAT
      },
      food_amount_at_end: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      daily_meal_number: {
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('feeder_weight_logs');
  }
};