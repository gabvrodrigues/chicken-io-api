const controller = require('../app/controllers/FeederWeightLogController')

module.exports = (app) => {
    app.get('/feeder-weight-log', controller.get);
    app.get('/feeder-weight-log/:id', controller.get);
    app.post('/feeder-weight-log/store', controller.create);
    app.put('/feeder-weight-log/food-amount-at-end/:id', controller.foodAmountAtEnd);
    app.delete('/feeder-weight-log/delete/:id', controller.destroy);
}