'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NestWeightLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NestWeightLog.belongsTo(models.Chickens, { foreignKey: 'chicken_id', as: 'Chickens' })
    }
  };
  NestWeightLog.init({
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    chicken_id: DataTypes.STRING,
    laid_egg: DataTypes.BOOLEAN,
    egg_weight: DataTypes.FLOAT,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'NestWeightLog',
    underscored: true,
  });
  return NestWeightLog;
};