const Suggestion = require('../models/Suggestion');
const FlashCard = require('../models/FlashCard');
const Order = require('../models/Order');

/**
 * RULE-BASED RECOMMENDATION ENGINE
 * 
 * Core Logic:
 * 1. Fetch order details
 * 2. Identify product category and subcategory
 * 3. Return care-based suggestions:
 *    - Accessories (complete the setup)
 *    - Care plans (protect the product)
 *    - Subscriptions (ongoing value)
 * 4. Educational flash cards before suggestions
 */

exports.getRecommendations = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch order details
    const order = await Order.findOne({ orderId }).populate('product');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const { productCategory, productSubcategory } = order;

    // Fetch flash cards for education
    let flashCards = await FlashCard.find({
      category: productCategory
    }).sort('priority').limit(4);

    // If no specific flash cards, get generic ones
    if (flashCards.length === 0) {
      flashCards = await FlashCard.find({ category: 'General' }).sort('priority').limit(4);
    }

    // Fetch suggestions based on product category
    let suggestions = [];

    // Priority 1: Exact category + subcategory match
    if (productSubcategory) {
      suggestions = await Suggestion.find({
        category: productCategory,
        subcategory: productSubcategory
      }).sort('-priority').limit(6);
    }

    // Priority 2: Category match only
    if (suggestions.length < 6) {
      const categoryMatches = await Suggestion.find({
        category: productCategory,
        subcategory: null
      }).sort('-priority').limit(6 - suggestions.length);
      suggestions = [...suggestions, ...categoryMatches];
    }

    // Group suggestions by type
    const groupedSuggestions = {
      accessories: suggestions.filter(s => s.type === 'Accessory'),
      carePlans: suggestions.filter(s => s.type === 'Care Plan' || s.type === 'Extended Warranty'),
      subscriptions: suggestions.filter(s => s.type === 'Subscription')
    };

    res.json({
      success: true,
      data: {
        order: {
          orderId: order.orderId,
          productName: order.productName,
          category: order.productCategory,
          subcategory: order.productSubcategory
        },
        flashCards: flashCards.map(fc => ({
          message: fc.message,
          icon: fc.icon
        })),
        suggestions: groupedSuggestions,
        allSuggestions: suggestions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations',
      error: error.message
    });
  }
};

// Get suggestions by category (for admin/testing)
exports.getSuggestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const suggestions = await Suggestion.find({ category }).sort('-priority');
    res.json({
      success: true,
      count: suggestions.length,
      data: suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching suggestions',
      error: error.message
    });
  }
};
