// components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const cartCount = cartItems ? cartItems.reduce((total, item) => total + item.qty, 0) : 0;
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;

  const categories = ['Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Books'];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <nav className="navbar" style={{ position: 'relative', zIndex: 70 }}>
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flex: '0 1 auto', minWidth: 0 }}>
        <Link to="/" className="nav-brand animate-gradient" style={{ fontWeight: 900, background: 'linear-gradient(45deg, var(--primary), #8B5CF6, var(--secondary), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.75rem', whiteSpace: 'nowrap' }}>
          Re-Cart
        </Link>
      </div>

      {/* Middle: Navigation Links - Hidden on mobile, shown when menu opens */}
    <div className={`nav-links nav-primary ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ flex: '1 1 auto', justifyContent: 'center', minHeight: 'auto', order: 'auto', overflow: 'auto', flexWrap: 'wrap' }}>
        
            <div 
              style={{ position: 'relative', width: isMobileMenuOpen ? '100%' : 'auto' }}
              onMouseEnter={() => !isMobileMenuOpen && setShowDropdown(true)}
              onMouseLeave={() => !isMobileMenuOpen && setShowDropdown(false)}
            >
              <Link to="/products" className="nav-link" style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>
                Products
              </Link>
              
              {showDropdown && !isMobileMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.85)',
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
                      onClick={() => { setShowDropdown(false); setIsMobileMenuOpen(false); }}
                    >
                      {cat}
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.25rem 0' }}></div>
                  <Link 
                    to="/products" 
                    className="nav-link" 
                    style={{ padding: '0.5rem 1rem', display: 'block', fontWeight: 'bold' }}
                    onClick={() => { setShowDropdown(false); setIsMobileMenuOpen(false); }}
                  >
                    All Products
                  </Link>
                </div>
              )}
            </div>
            <Link to="/cart" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, padding: '0.5rem 1rem', width: isMobileMenuOpen ? '100%' : 'auto' }} onClick={() => setIsMobileMenuOpen(false)}>
              Cart
              {cartCount > 0 && (
                <span style={{ 
                  background: 'var(--accent)', 
                  color: 'white', 
                  fontSize: '0.75rem', 
                  padding: '0.1rem 0.5rem', 
                  borderRadius: '1rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, padding: '0.5rem 1rem', width: isMobileMenuOpen ? '100%' : 'auto' }} onClick={() => setIsMobileMenuOpen(false)}>
              <span aria-hidden="true">♥</span>
              Wishlist
              {wishlistCount > 0 && (
                <span style={{ 
                  background: '#EF4444', 
                  color: 'white', 
                  fontSize: '0.75rem', 
                  padding: '0.1rem 0.5rem', 
                  borderRadius: '1rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            {user && (
              <>
                <Link to="/orders" className="nav-link" style={{ fontWeight: 600, padding: '0.5rem 1rem' }} onClick={() => setIsMobileMenuOpen(false)}>
                  Orders
                </Link>
                <Link to={`/dashboard/${user.role}`} className="nav-link" style={{ fontWeight: 600, padding: '0.5rem 1rem' }} onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              </>
            )}
      </div>

      {/* Right: Auth Buttons & Controls - Hidden on mobile until menu opens */}
      <div className={`nav-links nav-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ flex: isMobileMenuOpen ? '1 1 100%' : '0 1 auto', justifyContent: isMobileMenuOpen ? 'flex-start' : 'flex-end', marginTop: isMobileMenuOpen ? '1rem' : '0', alignItems: isMobileMenuOpen ? 'stretch' : 'center', gap: '1rem', width: isMobileMenuOpen ? '100%' : 'auto', overflow: 'hidden' }}>
        {/* Dark Mode Toggle - Always visible on desktop, shown in menu on mobile */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn"
          style={{ display: isMobileMenuOpen ? 'flex' : 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.2rem 0.6rem', background: 'transparent', boxShadow: 'none', border: 'none' }}
        >
          <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>{darkMode ? '🌙' : '☀️'}</span>
          <span style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '2px' }}>Mode</span>
        </button>

        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ whiteSpace: 'nowrap', background: 'var(--bg-light)', color: 'var(--text-main)', border: '1px solid var(--border-color)', boxShadow: 'none', width: isMobileMenuOpen ? '100%' : 'auto', padding: '0.6rem 1.5rem' }}
          >
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', width: 'auto', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
            <Link to="/login" className="btn" style={{ whiteSpace: 'nowrap', background: 'transparent', color: 'var(--text-main)', fontWeight: 600, border: '1px solid var(--border-color)', padding: '0.6rem 1rem', width: 'auto', textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>
              Log In
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ whiteSpace: 'nowrap', fontWeight: 600, padding: '0.6rem 1rem', width: 'auto', boxShadow: 'var(--shadow-md)', textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle Button - Always visible on mobile, top right */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        aria-label="Toggle Menu"
        style={{ flex: '0 0 auto', marginLeft: 'auto', order: 2, zIndex: 60 }}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
}
