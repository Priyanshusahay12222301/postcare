const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Accessory', 'Care Plan', 'Subscription', 'Extended Warranty']
  },
  category: {
    type: String,
    required: true
  },
  subcategory: String,
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/200'
  },
  benefits: [{
    type: String
  }],
  priority: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
