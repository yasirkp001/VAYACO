import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { showToast } from '../features/ui/uiSlice';
import QuantitySelector from '../components/QuantitySelector';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: products } = useSelector((state) => state.products);

  const getProductDetails = (item) => {
    // First try to get from stored productData, then from products list
    return item.productData || products.find((p) => p.id === item.product);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    dispatch(showToast({ message: 'Removed from cart', type: 'info' }));
  };

  const handleQuantityChange = (productId, newQty) => {
    dispatch(updateQuantity({ product: productId, qty: newQty }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(showToast({ message: 'Cart cleared', type: 'info' }));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const product = getProductDetails(item);
    return acc + (product ? product.price * item.qty : 0);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link to="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">{cartItems.length} item(s)</span>
              <button onClick={handleClearCart} className="text-red-500 hover:text-red-600 text-sm">
                Clear Cart
              </button>
            </div>
            
            {cartItems.map((item) => {
              const product = getProductDetails(item);
              return product ? (
                <div key={item.product} className="bg-white border rounded-lg p-4 flex gap-4">
                  <img src={product.image} alt={product.title} className="w-24 h-24 object-contain" />
                  <div className="flex-grow">
                    <Link to={`/products/${item.product}`} className="font-semibold hover:text-blue-500 line-clamp-2">
                      {product.title}
                    </Link>
                    <p className="text-gray-500 text-sm capitalize">{product.category}</p>
                    <p className="font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveFromCart(item.product)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <QuantitySelector
                      quantity={item.qty}
                      onIncrease={() => handleQuantityChange(item.product, item.qty + 1)}
                      onDecrease={() => handleQuantityChange(item.product, item.qty - 1)}
                    />
                  </div>
                </div>
              ) : null;
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-green-600">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
                )}
                <hr />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg mt-6 block text-center"
              >
                Proceed to Checkout
              </Link>
              <Link to="/products" className="block text-center text-blue-500 mt-4 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
