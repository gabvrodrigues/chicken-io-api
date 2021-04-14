'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChickenWeightLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChickenWeightLogs.belongsTo(models.Chickens, {foreignKey: 'chicken_id', as: 'chickens'})
    }
  };
  ChickenWeightLogs.init({
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    chicken_id: DataTypes.INTEGER,
    weight: DataTypes.BOOLEAN,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ChickenWeightLogs',
    underscored: true
  });
  return ChickenWeightLogs;
};