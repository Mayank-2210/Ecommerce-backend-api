const express = require('express');
const route = express.Router();
const {getAllOrdersAdmin,updateOrderStatus} = require('../controllers/adminOrderController');

const {protect} = require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/adminMiddleware');

route.use(protect);
route.use(adminOnly);

route.get('/admin/orders',getAllOrdersAdmin);
route.put('/admin/orders/:id',updateOrderStatus);

module.exports = route;
