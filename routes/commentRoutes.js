const express = require('express');
const router = express.Router();
const {addComment,getProductComments,deleteComment} = require('../controllers/commentController');

const {protect} = require('../middleware/authMiddleware');

router.post('/comment',protect,addComment);
router.get('/comment/:productId',getProductComments);
router.delete('/comment/:commentId',protect,deleteComment);

module.exports = router;