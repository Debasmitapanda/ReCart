// components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems ? cartItems.reduce((total, item) => total + item.qty, 0) : 0;

  const categories = ['Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Books'];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="nav-brand animate-gradient" style={{ fontWeight: 900, background: 'linear-gradient(45deg, var(--primary), #8B5CF6, var(--secondary), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Re-Cart
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        {user && (
          <>
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link to="/products" className="nav-link" style={{ display: 'inline-block', padding: '0.5rem 0' }}>
                Products
              </Link>
              
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '180px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 100
                }}>
                  {categories.map(cat => (
                    <Link 
                      key={cat} 
                      to={`/products?category=${cat}`} 
                      className="nav-link" 
                      style={{ padding: '0.5rem 1rem', display: 'block', borderRadius: 'var(--radius-sm)' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.25rem 0' }}></div>
                  <Link 
                    to="/products" 
                    className="nav-link" 
                    style={{ padding: '0.5rem 1rem', display: 'block', fontWeight: 'bold' }}
                    onClick={() => setShowDropdown(false)}
                  >
                    All Products
                  </Link>
                </div>
              )}
            </div>
            <Link to="/cart" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Cart
              {cartCount > 0 && (
                <span style={{ 
                  background: 'var(--accent)', 
                  color: 'white', 
                  fontSize: '0.75rem', 
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '1rem',
                  fontWeight: 'bold',
                  minWidth: '1.25rem',
                  textAlign: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            <Link to={`/dashboard/${user.role}`} className="nav-link">
              Dashboard
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="nav-links">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>

        {/* Auth Buttons */}
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ background: 'var(--bg-light)', color: 'var(--text-main)', border: '1px solid var(--border-color)', boxShadow: 'none' }}
          >
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/login" className="btn" style={{ background: 'var(--bg-light)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
              Log In
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
