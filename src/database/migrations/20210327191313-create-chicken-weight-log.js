'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chicken_weight_logs', {
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
      weight: {
        type: Sequelize.FLOAT
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
    }, {underscored: true});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chicken_weight_logs');
  }
};