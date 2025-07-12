const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/authMiddleware');
const{
    placeOrder,
    getMyOrders
} = require('../controllers/orderController');

router.use(protect);

router.post('/orders',placeOrder);

router.get('/orders',getMyOrders);

module.exports = router;
