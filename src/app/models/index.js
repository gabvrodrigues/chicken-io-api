const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/database.js');

// const EnvironmentalLog = require("./EnvironmentalLog");

const db = {};
const sequelize = new Sequelize(config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// const models = {
//   EnvironmentalLog: EnvironmentalLog.init(sequelize, Sequelize),
// };

// db.models = models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
