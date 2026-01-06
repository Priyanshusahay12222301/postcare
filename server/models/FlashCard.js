const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  subcategory: String,
  message: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '💡'
  },
  priority: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FlashCard', flashCardSchema);
