import React from 'react';

const PriceFilter = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-600 font-medium">Price:</span>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => onMinChange(e.target.value)}
        placeholder="Min"
        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-400">-</span>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => onMaxChange(e.target.value)}
        placeholder="Max"
        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PriceFilter;
