const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

//authorization
const auth = require('../middleware/auth')

//router user
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

//router product
router.get('/products', productController.listProducts);
router.get('/products/:id', productController.detailProduct);

router.post('/products', auth, productController.createNewProduct);
router.put('/products/:id', auth, productController.updatedProduct);
router.delete('/products/:id', auth, productController.deleteProductById);


module.exports = router;