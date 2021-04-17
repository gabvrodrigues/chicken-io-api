const controller = require('../app/controllers/TagController')

module.exports = (app) => {
    app.get('/tags', controller.get);
    app.get('/available-tags', controller.getAvailableTags);
    app.post('/tags/store', controller.create);
    app.put('/tags/edit/:id', controller.update);
    app.put('/tags/set-tag-status/:code', controller.setTagStatus);
    app.delete('/tags/delete/:id', controller.destroy);
}