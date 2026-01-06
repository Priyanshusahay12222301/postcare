const Coupon = require('../models/Coupon');

// Generate thank-you coupon for an order
exports.generateThankYouCoupon = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Generate unique coupon code
    const couponCode = 'THANKYOU-' + orderId + '-' + Math.floor(Math.random() * 1000);

    // Set expiry date (30 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const coupon = await Coupon.create({
      code: couponCode,
      discountPercentage: 10,
      description: 'Thank you for your purchase! Enjoy 10% off your next accessory purchase.',
      validFor: 'All accessories',
      expiryDate,
      usageLimit: 1,
      isActive: true
    });

    res.status(201).json({
      success: true,
      data: coupon
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error generating coupon',
      error: error.message
    });
  }
};

// Validate coupon code
exports.validateCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code'
      });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return res.json({
        success: false,
        valid: false,
        message: 'This coupon is no longer active'
      });
    }

    // Check if coupon has expired
    if (new Date() > coupon.expiryDate) {
      return res.json({
        success: false,
        valid: false,
        message: 'This coupon has expired'
      });
    }

    // Check usage limit
    if (coupon.usedCount >= coupon.usageLimit) {
      return res.json({
        success: false,
        valid: false,
        message: 'This coupon has reached its usage limit'
      });
    }

    res.json({
      success: true,
      valid: true,
      data: coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating coupon',
      error: error.message
    });
  }
};

// Apply coupon (increment usage count)
exports.applyCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code'
      });
    }

    // Increment usage count
    coupon.usedCount += 1;
    await coupon.save();

    res.json({
      success: true,
      message: 'Coupon applied successfully',
      data: coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error applying coupon',
      error: error.message
    });
  }
};

// Get all coupons (for admin)
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort('-createdAt');
    res.json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons',
      error: error.message
    });
  }
};
