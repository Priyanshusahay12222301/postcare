const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts);

// GET product by ID
router.get('/:id', productController.getProductById);

// GET products by category
router.get('/category/:category', productController.getProductsByCategory);

// POST create new product
router.post('/', productController.createProduct);

module.exports = router;
