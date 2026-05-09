import { useParams, useNavigate } from 'react-router-dom';
import ProductCarousel from '../../components/ProductCarousel';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  
  const product = products.find(p => (p._id || p.id)?.toString() === id);

  if (!product) {
    return <div className="page-wrapper main-content" style={{ padding: '2rem', textAlign: 'center' }}>Product not found</div>;
  }

  return (
    <div className="page-wrapper main-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Product Images */}
      <ProductCarousel images={product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : [])} />

      {/* Product Info */}
      <div className="product-details-card" style={{ marginTop: '2rem', background: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        <h1 className="heading-primary" style={{ marginBottom: '0.5rem' }}>{product.name}</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{product.description}</p>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Price</span>
            <span className="product-price" style={{ fontSize: '2rem', margin: 0 }}>₹{product.price?.toLocaleString()}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Condition</span>
            <span style={{ fontWeight: 600 }}>{product.condition}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Age</span>
            <span style={{ fontWeight: 600 }}>{product.age || 'Not specified'}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Delivery Charge</span>
            <span style={{ fontWeight: 600 }}>₹{product.deliveryCharge || 0}</span>
          </div>
        </div>

        {/* Seller Info */}
        <div style={{ padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: 600, margin: 0 }}>Seller: {product.seller?.name || 'Unknown Seller'}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Rating: {product.seller?.rating || '5.0'}⭐</p>
        </div>

        {/* Add to Cart */}
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          onClick={() => {
            addToCart(product);
            navigate('/cart');
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* Reviews */}
      <div className="reviews-section" style={{ marginTop: '2rem', padding: '2rem', background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)' }}>
        <h2 className="heading-secondary">Reviews</h2>
        <div className="review-list">
          {(!product.reviews || product.reviews.length === 0) ? (
            <p className="text-muted">No reviews yet for this product.</p>
          ) : (
            product.reviews.map((review) => (
              <div key={review.id} className="review-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <p style={{ fontWeight: 600 }}>{review.user}</p>
                <p style={{ color: '#F59E0B' }}>{'⭐'.repeat(review.rating)}</p>
                <p className="text-muted">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
