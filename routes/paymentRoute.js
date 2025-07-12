const express = require('express');
const route = express.Router();

const {createRazorpayOrder,verifyRazorpayPayment} = require('../controllers/paymentController');

route.post('/payment',createRazorpayOrder);
route.post('/payment/signature',verifyRazorpayPayment);

module.exports = route;