import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderByOrderId, getRecommendations, generateCoupon } from '../services/api';

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
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  const handleAddToCart = (suggestion) => {
    setCartItems([...cartItems, suggestion]);
    alert(`${suggestion.name} added to cart!`);
  };

  const scrollToSuggestions = () => {
    const element = document.getElementById('complete-setup-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Order Confirmation Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-3 mb-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Order Confirmed!</h1>
                <p className="text-xs text-gray-600">#{order.orderId}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-3xl font-bold text-gray-900">${order.totalAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{formatDate(order.deliveryDate)}</p>
            </div>
          </div>
        </div>

        {/* Nudge Banner */}
        <div className="relative overflow-hidden mb-4">
          <button 
            onClick={scrollToSuggestions}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full p-1.5">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">🎁 Protect Your Purchase!</p>
                  <p className="text-white text-xs opacity-90">See recommended protection plans below</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-white text-xs font-semibold">View</span>
                <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left Column - Order Details & Coupon */}
          <div className="lg:col-span-1 space-y-3">
            
            {/* Order Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-2.5 border border-gray-200">
              <h3 className="font-semibold text-sm text-gray-900 mb-1.5">Order Details</h3>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Order ID</span>
                  <span className="font-medium text-xs">{order.orderId}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Status</span>
                  <span className="font-medium text-green-600 text-xs">{order.orderStatus}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Product</span>
                  <span className="font-medium text-xs">{order.productName}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-xs text-gray-600">Total Paid</span>
                  <span className="font-bold text-sm">${order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Coupon Card */}
            {coupon && (
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-xl overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full -ml-8 -mb-8"></div>
                
                <div className="relative p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="bg-white rounded-lg p-2">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Thank You Gift</p>
                        <p className="text-white text-xs opacity-90">Save {coupon.discountPercentage}%!</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Code Box */}
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1 text-center">Your Exclusive Code</p>
                    <div className="bg-gray-50 rounded border-2 border-dashed border-purple-300 p-2 mb-2">
                      <p className="text-purple-600 font-bold text-center break-all leading-tight" style={{fontSize: '11px', wordBreak: 'break-word'}}>{coupon.code}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                        alert('Coupon code copied!');
                      }}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-xs font-bold hover:bg-purple-700 transition flex items-center justify-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span>Copy Code</span>
                    </button>
                  </div>
                  
                  {/* Benefits */}
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-white">
                      <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>Valid on accessories</span>
                    </div>
                    <div className="flex items-center text-xs text-white">
                      <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>Expires {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          
          {/* Right Column - Suggestions & Content */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Flash Cards Section */}
            {recommendations && recommendations.flashCards && recommendations.flashCards.length > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200 p-3">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-500 rounded-full p-1.5 mr-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                    </svg>
                  </div>
                  <h2 className="text-base font-bold text-gray-900">Why Product Care Matters</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recommendations.flashCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-xl p-2 shadow-sm border border-orange-100">
                      <div className="flex items-start">
                        <span className="text-lg mr-2">{card.icon}</span>
                        <p className="text-xs text-gray-700 leading-relaxed">{card.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Your Setup Section */}
            {showSuggestions && recommendations && recommendations.allSuggestions && recommendations.allSuggestions.length > 0 && (
              <div id="complete-setup-section" className="bg-white rounded-2xl p-6 scroll-mt-4">
                
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Complete Your Setup
                  </h2>
                  <p className="text-sm text-gray-500">
                    Recommended add-ons for iPhone 15 Pro
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {recommendations.allSuggestions.slice(0, 12).map((suggestion, index) => (
                    <div 
                      key={suggestion._id} 
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      
                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                          {suggestion.type === 'Care Plan' && (
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          )}
                          {suggestion.type === 'Accessory' && (
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          )}
                          {suggestion.type === 'Subscription' && (
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 text-base mb-3 text-center">
                        {suggestion.name}
                      </h3>
                      
                      {/* Benefits List */}
                      {suggestion.benefits && suggestion.benefits.length > 0 && (
                        <ul className="space-y-1.5 mb-4">
                          {suggestion.benefits.slice(0, 4).map((benefit, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-2xl font-semibold text-gray-900">
                            ${suggestion.price}
                          </span>
                          {suggestion.type !== 'Subscription' && (
                            <span className="text-sm text-gray-400 line-through">
                              ${(suggestion.price * 1.3).toFixed(0)}
                            </span>
                          )}
                        </div>
                        {suggestion.type === 'Subscription' && (
                          <p className="text-xs text-gray-500 text-center">/month</p>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(suggestion)}
                        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500">
                  Optional add-ons • No obligation to purchase • Free returns available
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
          <h3 className="font-bold text-base text-gray-900 mb-2 text-center">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <svg className="w-6 h-6 mb-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-700 text-center">View Invoice</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <svg className="w-6 h-6 mb-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <span className="text-xs font-medium text-gray-700 text-center">Chat</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <svg className="w-6 h-6 mb-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-xs font-medium text-gray-700 text-center">Help</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-center text-white shadow-xl">
          <h2 className="text-base font-bold mb-1.5">We're Here to Help You Succeed</h2>
          <p className="text-xs text-blue-100 mb-3 max-w-2xl mx-auto">
            Our goal isn't just to sell products - it's to help you protect and get the most value from your purchase.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-50 transition">
              Track Your Order
            </button>
            <button className="bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-800 transition border-2 border-white">
              Contact Support 24/7
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
