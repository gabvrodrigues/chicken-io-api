const controller = require('../app/controllers/EnvironmentalLogController')

module.exports = (app) => {
    app.get('/environmental-log/:type', controller.get);
    app.post('/environmental-log/store', controller.create);
    app.delete('/environmental-log/delete/:id', controller.destroy);
}