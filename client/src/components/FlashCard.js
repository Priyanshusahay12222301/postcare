import React from 'react';

const FlashCard = ({ flashCard, index }) => {
  return (
    <div 
      className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 transform hover:scale-105 transition-transform duration-200"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl flex-shrink-0">
          {flashCard.icon}
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-medium leading-relaxed">
            {flashCard.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
