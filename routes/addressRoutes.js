const express = require('express');
const router = express.Router();

const {addAddress,getUserAddresses,updateAddress,deleteAddress} = require('../controllers/addressController');

const {protect} = require('../middleware/authMiddleware');

router.post('/address',protect,addAddress);

router.get('/address',protect,getUserAddresses);

router.put('/address/:id',protect,updateAddress);

router.delete('/address/:id',protect,deleteAddress);

module.exports = router;