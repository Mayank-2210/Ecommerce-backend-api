const express = require('express');
const router = express.Router();

const {
    addToWishlist,
    getAllProductsInWishlist,
    deleteProductFromWishlist } = require('../controllers/wishlistController');

const {protect} = require('../middleware/authMiddleware');

router.post('/wishlist',protect ,addToWishlist);
router.get('/wishlist',protect,getAllProductsInWishlist);
router.delete('/wishlist/:productId',deleteProductFromWishlist);

module.exports = router;