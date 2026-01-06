import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderByOrderId, getRecommendations, generateCoupon } from '../services/api';
import FlashCard from '../components/FlashCard';
import SuggestionCard from '../components/SuggestionCard';

const ThankYouPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchOrderAndRecommendations();
  }, [orderId]);

  const fetchOrderAndRecommendations = async () => {
    try {
      // Fetch order details
      const orderResponse = await getOrderByOrderId(orderId);
      setOrder(orderResponse.data.data);

      // Fetch recommendations
      const recResponse = await getRecommendations(orderId);
      setRecommendations(recResponse.data.data);

      // Generate thank-you coupon
      const couponResponse = await generateCoupon(orderId);
      setCoupon(couponResponse.data.data);

      setLoading(false);

      // Auto-show suggestions after 2 seconds (after user reads flash cards)
      setTimeout(() => {
        setShowSuggestions(true);
      }, 2000);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  const handleAddToCart = (suggestion) => {
    setCartItems([...cartItems, suggestion]);
    alert(`${suggestion.name} added to cart!`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Order not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section 1: Confirmation & Trust */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Purchase! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your order has been confirmed and is being processed.
          </p>

          <div className="card max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="font-semibold text-gray-900">{order.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Status</p>
                <p className="font-semibold text-green-600">{order.orderStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                <p className="font-semibold text-gray-900">{formatDate(order.deliveryDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                <p className="font-semibold text-blue-600">{order.trackingNumber}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-4">
                {order.product && (
                  <>
                    <img
                      src={order.product.imageUrl}
                      alt={order.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{order.productName}</h3>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {order.quantity}</p>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        ${order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Help First */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Need Help?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="card hover:shadow-xl transition-all text-center group">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Track Order
              </h3>
              <p className="text-sm text-gray-600">
                Real-time tracking updates
              </p>
            </button>

            <button className="card hover:shadow-xl transition-all text-center group">
              <div className="text-3xl mb-3">↩️</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Cancel / Return
              </h3>
              <p className="text-sm text-gray-600">
                Easy returns within 30 days
              </p>
            </button>

            <button className="card hover:shadow-xl transition-all text-center group">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Contact Support
              </h3>
              <p className="text-sm text-gray-600">
                24/7 customer service
              </p>
            </button>
          </div>
        </div>

        {/* Section 3: Educational Flash Cards */}
        {recommendations && recommendations.flashCards && recommendations.flashCards.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Did You Know? 💡
              </h2>
              <p className="text-gray-600">
                Here are some helpful tips to protect and care for your purchase
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.flashCards.map((card, index) => (
                <FlashCard key={index} flashCard={card} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Helpful Suggestions (Optional) */}
        {showSuggestions && recommendations && recommendations.allSuggestions && recommendations.allSuggestions.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                You May Find These Helpful 🛡️
              </h2>
              <p className="text-gray-600 mb-4">
                Based on your purchase, here are some optional care items and accessories
              </p>
              <p className="text-sm text-gray-500 italic">
                Everything is optional - skip if not interested
              </p>
            </div>

            {/* Care Plans */}
            {recommendations.suggestions.carePlans && recommendations.suggestions.carePlans.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🛡️</span>
                  Protection & Care Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.suggestions.carePlans.map((suggestion) => (
                    <SuggestionCard
                      key={suggestion._id}
                      suggestion={suggestion}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Accessories */}
            {recommendations.suggestions.accessories && recommendations.suggestions.accessories.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🔌</span>
                  Complete Your Setup
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.suggestions.accessories.map((suggestion) => (
                    <SuggestionCard
                      key={suggestion._id}
                      suggestion={suggestion}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Subscriptions */}
            {recommendations.suggestions.subscriptions && recommendations.suggestions.subscriptions.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🔄</span>
                  Ongoing Value
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.suggestions.subscriptions.map((suggestion) => (
                    <SuggestionCard
                      key={suggestion._id}
                      suggestion={suggestion}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Hide suggestions
              </button>
            </div>
          </div>
        )}

        {/* Section 5: Thank You Coupon */}
        {coupon && (
          <div className="mb-12">
            <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Here's a Gift for You!
              </h2>
              <p className="text-gray-700 mb-6">
                {coupon.description}
              </p>

              <div className="bg-white border-2 border-dashed border-yellow-400 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-sm text-gray-600 mb-2">Your Coupon Code</p>
                <p className="text-3xl font-mono font-bold text-gray-900 mb-4 tracking-wider">
                  {coupon.code}
                </p>
                <p className="text-sm text-gray-600">
                  Valid until {new Date(coupon.expiryDate).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-6 italic">
                No pressure to use it - it's here when you need it! 😊
              </p>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            We're Here to Help You Succeed
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Our goal isn't just to sell products - it's to help you protect and get the most value from your purchase.
          </p>
          <p className="text-lg text-blue-50">
            If you need anything, our support team is available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
