const express = require('express');
const router = express.Router();
const{protect} = require('../middleware/authMiddleware');
const{addToCart,getCart,removeFromCart,updateCartItem} = require('../controllers/cartController');

router.use(protect);

router.post('/cart',addToCart);

router.get('/cart',getCart);

router.delete('/cart/:productId',removeFromCart);

router.put('/cart/:productId',updateCartItem);

module.exports = router;