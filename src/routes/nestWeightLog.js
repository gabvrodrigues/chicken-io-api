const controller = require('../app/controllers/NestWeightLogController')

module.exports = (app) => {
    app.get('/nest-weight-log', controller.get);
    app.get('/nest-weight-log/:id', controller.get);
    app.post('/nest-weight-log/store', controller.create);
    app.delete('/nest-weight-log/delete/:id', controller.destroy);
}