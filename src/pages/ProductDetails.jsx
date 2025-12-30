import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts, fetchProductById } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { showToast } from '../features/ui/uiSlice';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import QuantitySelector from '../components/QuantitySelector';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: products, currentProduct, status } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  
  const product = currentProduct || products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(id));
    }
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [id, product, status, dispatch]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product: product.id, qty: quantity, productData: product }));
    dispatch(showToast({ message: `${quantity} item(s) added to cart!`, type: 'success' }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ product: product.id, productData: product }));
    dispatch(showToast({ message: 'Added to wishlist!', type: 'info' }));
  };

  if (status === 'loading' || !product) {
    return <Loader />;
  }

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-blue-500">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-blue-500">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 capitalize">{product.category}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg p-8">
          <img src={product.image} alt={product.title} className="w-full max-h-96 object-contain" />
        </div>

        {/* Product Info */}
        <div>
          <span className="text-blue-500 uppercase text-sm font-medium">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.title}</h1>
          
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <Rating rating={product.rating.rate} count={product.rating.count} />
              <span className="text-gray-500">({product.rating.count} reviews)</span>
            </div>
          )}

          <p className="text-3xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600">Quantity:</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 pt-8 border-t space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free shipping on orders over $50
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              30-day return policy
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Secure checkout
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <img src={p.image} alt={p.title} className="w-full h-32 object-contain mb-4" />
                <h3 className="font-medium line-clamp-2 text-sm">{p.title}</h3>
                <p className="font-bold mt-2">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
