const controller = require('../controllers/order.controller');

module.exports = function (app) {
    app.post('/api/order/:id', controller.order);
    // get all orders
    app.get('/api/order', controller.getAllOrders);
    //get order by id
    app.get('/api/order/:id', controller.getOrderByUserId);
};
