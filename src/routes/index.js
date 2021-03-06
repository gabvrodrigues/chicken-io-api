const UserRoute = require('./user');
const EnvironmentalLogRoute = require('./environmentalLog');
const TagRoute = require('./tag');
const ChickenRoute = require('./chicken');
const FeederWeightLogRoute = require('./feederWeightLog');
const ChickenWeightLogRoute = require('./chickenWeightLog');
const NestWeightLogRoute = require('./nestWeightLog');

module.exports = (app) => {
    UserRoute(app),
    EnvironmentalLogRoute(app),
    TagRoute(app),
    ChickenRoute(app),
    FeederWeightLogRoute(app),
    ChickenWeightLogRoute(app),
    NestWeightLogRoute(app)
}