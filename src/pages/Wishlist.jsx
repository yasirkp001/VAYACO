import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import { showToast } from '../features/ui/uiSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: products } = useSelector((state) => state.products);

  const getProductDetails = (item) => {
    return item.productData || products.find((p) => p.id === item.product);
  };

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    dispatch(showToast({ message: 'Removed from wishlist', type: 'info' }));
  };

  const handleMoveToCart = (item) => {
    const product = getProductDetails(item);
    dispatch(addToCart({ product: item.product, qty: 1, productData: product }));
    dispatch(removeFromWishlist(item.product));
    dispatch(showToast({ message: 'Moved to cart!', type: 'success' }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
          <Link to="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => {
            const product = getProductDetails(item);
            return product ? (
              <div key={item.product} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Link to={`/products/${item.product}`}>
                    <img src={product.image} alt={product.title} className="w-full h-48 object-contain p-4" />
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-500"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/products/${item.product}`}>
                    <h2 className="font-semibold line-clamp-2 hover:text-blue-500">{product.title}</h2>
                  </Link>
                  <p className="text-xl font-bold mt-2 mb-4">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Move to cart 
                  </button>
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
