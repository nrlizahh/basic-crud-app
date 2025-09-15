const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

//router user
router.post('/register', userController.registerUser);

//router product
router.get('/products', productController.listProducts);
router.get('/products/:id', productController.detailProduct);


module.exports = router;