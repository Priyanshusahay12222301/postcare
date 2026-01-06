const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  productCategory: String,
  productSubcategory: String,
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true
  },
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Completed'
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  deliveryDate: {
    type: Date
  },
  trackingNumber: {
    type: String
  }
}, {
  timestamps: true
});

// Generate order ID before saving
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
