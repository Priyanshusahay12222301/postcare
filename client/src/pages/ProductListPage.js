import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 mb-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to PostCare+
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-6">
          Trust-first shopping experience with care-based post-purchase support
        </p>
        <p className="text-lg text-blue-50 max-w-3xl">
          Shop with confidence knowing we'll help you protect and care for your purchases. 
          No forced upsells, just helpful suggestions when you need them.
        </p>
      </div>

      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
        <p className="text-gray-600 mb-6">Browse our collection of premium products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Why Shop With Us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h4 className="font-semibold text-gray-900 mb-2">No Force-Selling</h4>
            <p className="text-gray-600 text-sm">
              Shop without pressure. All suggestions are optional and shown only after purchase.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💙</div>
            <h4 className="font-semibold text-gray-900 mb-2">Care-First Approach</h4>
            <p className="text-gray-600 text-sm">
              We help you protect and maintain what you buy, not just sell more products.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">✨</div>
            <h4 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
            <p className="text-gray-600 text-sm">
              Clear prices, no hidden fees. What you see is what you get.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
