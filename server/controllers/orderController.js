const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    console.log('Received order request:', req.body);
    const { productId, quantity, customerInfo } = req.body;

    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Product not found:', productId);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('Found product:', product.name);

    // Calculate total amount
    const totalAmount = product.price * quantity;

    // Set delivery date (5-7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 6);

    // Create order
    const order = await Order.create({
      product: productId,
      productName: product.name,
      productCategory: product.category,
      productSubcategory: product.subcategory,
      quantity,
      totalAmount,
      customerInfo,
      deliveryDate,
      trackingNumber: 'TRK-' + Date.now(),
      paymentStatus: 'Completed',
      orderStatus: 'Processing'
    });

    console.log('Order created:', order.orderId);

    // Populate product details
    await order.populate('product');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('product');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Get order by Order ID (ORD-xxxxx)
exports.getOrderByOrderId = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId }).populate('product');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product').sort('-createdAt');
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};
