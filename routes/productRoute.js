const express = require("express");
const router = express.Router();
const upload = require('../middleware/multerConfig');
const {
    uploadProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
                    } = require('../controllers/productController');
const {protect}=require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/adminMiddleware');


router.post('/admin/products',
    protect,
    adminOnly,
    upload.single('image'),
    uploadProduct
);

router.get('/products',getAllProducts);

router.put('/admin/products/:id',
    protect,
    adminOnly,
    upload.single('image'),
    updateProduct
);

router.delete('/admin/products/:id',
    protect,
    adminOnly,
    deleteProduct
)

module.exports = router;