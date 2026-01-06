const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// GET recommendations for an order
router.get('/:orderId', recommendationController.getRecommendations);

// GET suggestions by category
router.get('/category/:category', recommendationController.getSuggestionsByCategory);

module.exports = router;
