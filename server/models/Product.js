const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Other']
  },
  subcategory: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  brand: {
    type: String,
    trim: true
  },
  features: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
