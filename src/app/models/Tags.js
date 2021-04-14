'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      // define association here
    }
  };
  Tags.init({
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    tag_code: DataTypes.STRING,
    is_using: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tags',
    underscored: true,
  });
  return Tags;
};