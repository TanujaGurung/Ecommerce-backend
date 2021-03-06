const controller = require('./user.controller');
module.exports = function (app) {
    app.post('/api/auth/signup', controller.signup);
    app.post('/api/auth/signin', controller.signin);
    app.get('/api/auth/getUserById/:id', controller.getUserById);
};
