import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useCart } from '../context/CartContext';

function Header({ searchTerm, onSearchChange }) {
  const { getTotalItems, toggleCart } = useCart();

  const categories = ['Electronics', 'Accessories', 'Home', 'Sports'];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" className="header-logo">
            <h1 className="header-title">🛒 QuickCart</h1>
          </Link>

          <div className="header-actions">
            <nav className="header-nav">
              <Link to="/" className="nav-link">Home</Link>
              {categories.map((cat) => (
                <Link key={cat} to={`/category/${cat}`} className="nav-link">{cat}</Link>
              ))}
              <Link to="/cart" className="nav-link">Cart</Link>
            </nav>

            <div className="search-container">
              <input
                className="search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              />
            </div>

            <button className="cart-icon-btn" onClick={toggleCart} aria-label="Open cart">
              🛒
              {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;