const controller = require('../app/controllers/ChickenWeightLogController')

module.exports = (app) => {
    app.get('/chicken-weight-log', controller.get);
    app.get('/chicken-weight-log/:id', controller.get);
    app.post('/chicken-weight-log/store', controller.create);
    app.delete('/chicken-weight-log/delete/:id', controller.destroy);
}