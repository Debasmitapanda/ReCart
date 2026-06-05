import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductsContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter out any ghost items that were deleted from the catalog
  const validWishlistItems = wishlistItems.filter(item => 
    products.some(p => (p._id || p.id)?.toString() === (item._id || item.id)?.toString())
  );

  const handleBuyNow = async (product) => {
    await addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-content">
        <h1 className="heading-primary">My Wishlist</h1>
        
        {validWishlistItems.length === 0 ? (
          <p className="text-muted">Your wishlist is empty. Start browsing products to add them here!</p>
        ) : (
          <div className="product-grid">
            {validWishlistItems.map((product) => (
              <div key={product.id || product._id} className="product-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={product.localImage || ((product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/300?text=No+Image')}
                    alt={product.name}
                    className="product-image"
                  />
                </div>

                <div className="product-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <h2 className="product-title" style={{ margin: '0 0 0.25rem' }}>{product.name}</h2>
                      <p className="text-muted" style={{ margin: 0 }}>Condition: {product.condition || 'N/A'}</p>
                    </div>
                    <p className="product-price" style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>₹{product.price}</p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: '1 1 auto', minWidth: '140px' }}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ flex: '1 1 auto', minWidth: '140px' }}
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>

                  <button
                    className="btn"
                    style={{ background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-main)', width: 'fit-content', padding: '0.55rem 1rem' }}
                    onClick={() => removeFromWishlist(product._id || product.id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
