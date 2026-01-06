const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

// POST generate thank-you coupon
router.post('/generate', couponController.generateThankYouCoupon);

// GET validate coupon
router.get('/validate/:code', couponController.validateCoupon);

// POST apply coupon
router.post('/apply/:code', couponController.applyCoupon);

// GET all coupons
router.get('/', couponController.getAllCoupons);

module.exports = router;
