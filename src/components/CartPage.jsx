import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart = [], updateQuantity, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-page-content">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-page-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Summary</h3>
            <p>Total: ${getTotalPrice().toFixed(2)}</p>
            <button className="checkout-btn">Checkout</button>
            <Link to="/" className="continue-link">← Continue Shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
