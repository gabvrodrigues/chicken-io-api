const controller = require('../app/controllers/TagController')

module.exports = (app) => {
    app.get('/tags', controller.get);
    app.post('/tags/store', controller.create);
    app.put('/tags/edit/:id', controller.update);
    app.delete('/tags/delete/:id', controller.destroy);
}