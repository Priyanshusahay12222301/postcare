import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      // Create order with dummy customer info
      const orderData = {
        productId: product._id,
        quantity: 1,
        customerInfo: {
          name: 'Guest User',
          email: 'guest@postcare.com',
          phone: '0000000000',
          address: 'Guest Address'
        }
      };

      const response = await createOrder(orderData);
      const orderId = response.data.data.orderId;
      
      // Navigate to thank you page
      navigate(`/thank-you/${orderId}`);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="card hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        {product.brand && (
          <p className="text-sm text-gray-500">{product.brand}</p>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="pt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          
          <button 
            onClick={handleOrder}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
