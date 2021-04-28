const controller = require('../app/controllers/ChickenController')
const authController = require('../app/controllers/AuthController')

module.exports = (app) => {
    app.get('/', controller.testConnection);
    app.get('/chickens', authController.authenticateToken, controller.get);
    app.get('/chickens/:tagCode', controller.get);
    app.get('/chickens/can-eat/:tagCode', controller.getCanEat);
    app.post('/chickens/store', authController.authenticateToken, controller.create);
    app.put('/chickens/edit/:id', authController.authenticateToken, controller.update);
    app.delete('/chickens/delete/:id', authController.authenticateToken, controller.destroy);
}