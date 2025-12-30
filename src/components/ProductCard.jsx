import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { showToast } from '../features/ui/uiSlice';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ product: product.id, qty: 1, productData: product }));
    dispatch(showToast({ message: 'Added to cart!', type: 'success' }));
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    dispatch(addToWishlist({ product: product.id, productData: product }));
    dispatch(showToast({ message: 'Added to wishlist!', type: 'info' }));
  };

  return (
    <div className="group border rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <span className="text-xs text-blue-500 uppercase font-medium">{product.category}</span>
        <h2 className="text-lg font-semibold mt-1 line-clamp-2 h-14">{product.title}</h2>
        {product.rating && (
          <Rating rating={product.rating.rate} count={product.rating.count} />
        )}
      </Link>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
