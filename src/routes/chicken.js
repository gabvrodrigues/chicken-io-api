const controller = require('../app/controllers/ChickenController')

module.exports = (app) => {
    app.get('/', controller.testConnection);
    app.get('/chickens', controller.get);
    app.get('/chickens/:tagCode', controller.get);
    app.get('/chickens/can-eat/:tagCode', controller.getCanEat);
    app.post('/chickens/store', controller.create);
    app.put('/chickens/edit/:id', controller.update);
    app.delete('/chickens/delete/:id', controller.destroy);
}