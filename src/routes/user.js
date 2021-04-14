const controller = require('../app/controllers/UserController')

module.exports = (app) => {
    app.get('/user', controller.get);
    app.post('/user/store', controller.create);
    app.put('/user/edit/:id', controller.update);
    app.delete('/user/delete/:id', controller.destroy);
    app.post('/user/login', controller.login);
}