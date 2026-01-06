const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET all orders
router.get('/', orderController.getAllOrders);

// POST create new order
router.post('/', orderController.createOrder);

// GET order by MongoDB ID
router.get('/:id', orderController.getOrderById);

// GET order by Order ID (ORD-xxxxx)
router.get('/order/:orderId', orderController.getOrderByOrderId);

module.exports = router;
