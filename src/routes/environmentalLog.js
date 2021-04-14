const controller = require('../app/controllers/EnvironmentalLogController')

module.exports = (app) => {
    app.get('/environmental-log', controller.get);
    app.get('/environmental-log/get-by-date', controller.getByDate);
    app.post('/environmental-log/store', controller.create);
    app.delete('/environmental-log/delete/:id', controller.destroy);
}