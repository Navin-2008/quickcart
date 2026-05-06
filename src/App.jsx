import React, { useState } from 'react';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import ProductList from './components/ProductList';
import { products } from './data/products';
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prev) => {
      if (newQuantity <= 0) return prev.filter((item) => item.id !== productId);
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const toggleCart = () => setIsCartOpen((v) => !v);

  const getTotalItems = () => cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <div className="app">
      <Header cartItemCount={getTotalItems()} onCartClick={toggleCart} />
      <main className="main-content">
        <ProductList products={products} onAddToCart={addToCart} />
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;