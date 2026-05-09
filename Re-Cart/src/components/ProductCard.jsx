// components/ProductCard.js
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  return (
    <div className="product-card" style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <img
          src={(product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/300?text=No+Image'}
          alt={product.name}
          className="product-image"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '1.25rem',
            color: isSaved ? '#EF4444' : '#9CA3AF',
            transition: 'all 0.2s ease'
          }}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <Link 
          to={`/products?category=${product.category || 'Electronics'}`}
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            color: 'var(--primary)', 
            backgroundColor: 'rgba(79, 70, 229, 0.1)', 
            padding: '0.2rem 0.75rem', 
            borderRadius: 'var(--radius-full)', 
            display: 'inline-block',
            alignSelf: 'flex-start',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {product.category || 'Electronics'}
        </Link>
        <h2 className="product-title">{product.name}</h2>
        <p className="text-muted">
          Condition: {product.condition}
        </p>
        <p className="product-price">₹{product.price}</p>

        {/* View Details Button */}
        <Link
          to={`/products/${product._id || product.id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
