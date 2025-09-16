const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Router product
router.get('/', productController.listProducts);
router.get('/:id', productController.detailProduct);

router.post('/', auth, productController.createNewProduct);
router.put('/:id', auth, productController.updatedProduct);
router.delete('/:id', auth, productController.deleteProductById);

module.exports = router;
