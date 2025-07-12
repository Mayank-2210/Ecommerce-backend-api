const express = require('express');
const router = express.Router();

const {
    requestReturn,
    getAllReturns,
    approveReturn,
    rejectReturn
} = require('../controllers/returnController');

const {protect} = require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/adminMiddleware');

router.post('/return',protect,requestReturn);

router.get('/return',protect,adminOnly,getAllReturns);

router.put('/return/:id',protect,adminOnly,approveReturn);

router.put('/return/reject/:id',protect,adminOnly,rejectReturn);

module.exports = router;