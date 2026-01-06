import React from 'react';

const SuggestionCard = ({ suggestion, onAddToCart }) => {
  const typeColors = {
    'Accessory': 'bg-green-100 text-green-700',
    'Care Plan': 'bg-blue-100 text-blue-700',
    'Subscription': 'bg-purple-100 text-purple-700',
    'Extended Warranty': 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={suggestion.imageUrl}
          alt={suggestion.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <span className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-semibold ${typeColors[suggestion.type]}`}>
          {suggestion.type}
        </span>
      </div>
      
      <h4 className="text-lg font-semibold text-gray-900 mb-2">
        {suggestion.name}
      </h4>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {suggestion.description}
      </p>
      
      {suggestion.benefits && suggestion.benefits.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Benefits:</p>
          <ul className="space-y-1">
            {suggestion.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-xl font-bold text-gray-900">
          ${suggestion.type === 'Subscription' ? `${suggestion.price}/mo` : suggestion.price}
        </span>
        
        <button
          onClick={() => onAddToCart(suggestion)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition group-hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;
