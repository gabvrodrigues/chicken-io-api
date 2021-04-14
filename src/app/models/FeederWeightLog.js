'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeederWeightLogs extends Model {
    static associate(models) {
      FeederWeightLogs.hasOne(models.Chickens, {foreignKey: 'id'})
    }
  };
  FeederWeightLogs.init({
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    chicken_id: DataTypes.INTEGER,
    ate_food: DataTypes.BOOLEAN,
    food_amount: DataTypes.FLOAT,
    meals_per_day: DataTypes.FLOAT,
    food_amount_at_end: DataTypes.FLOAT,
    daily_meal_number: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'FeederWeightLogs',
    underscored: true
  });
  return FeederWeightLogs;
};