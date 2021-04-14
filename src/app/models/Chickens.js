const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chickens extends Model {
    static associate(models) {
      Chickens.hasOne(models.Tags, { foreignKey: 'id'})
      Chickens.belongsToMany(models.FeederWeightLogs, { through: 'ChickenFeederWeightLog', foreignKey: 'id', as: 'FeederWeightLog' })
    }
  };
  Chickens.init({
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    name: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    food_quantity: DataTypes.FLOAT,
    meals_per_day: DataTypes.FLOAT,
    path_image: DataTypes.STRING,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chickens',
    underscored: true
  });
  return Chickens;
};