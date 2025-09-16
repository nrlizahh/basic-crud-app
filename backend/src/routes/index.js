const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

// Prefix route
router.use('/users', userRoutes); // hasilnya: /users/register, /users/login
router.use('/products', productRoutes); // hasilnya: /products/...

module.exports = router;
