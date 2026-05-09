import { useParams, useNavigate } from 'react-router-dom';
import ProductCarousel from '../../components/ProductCarousel';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <div className="page-wrapper main-content">Product not found</div>;
  }

  return (
    <div className="page-wrapper main-content">
      {/* Product Images */}
      <ProductCarousel images={product.images && product.images.length > 0 ? product.images : undefined} />

      {/* Product Info */}
      <div className="product-details-card">
        <h1 className="heading-primary">{product.name}</h1>
        <p className="text-muted">{product.description}</p>
        <p className="product-price">₹{product.price}</p>
        <p className="mt-2">Condition: {product.condition}</p>
        <p className="mt-2">Age: {product.age}</p>
        <p className="mt-2">Delivery Charge: ₹{product.deliveryCharge}</p>

        {/* Seller Info */}
        <div className="mt-4">
          <p className="font-semibold">Seller: {product.seller.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Rating: {product.seller.rating}⭐</p>
        </div>

        {/* Add to Cart */}
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '1.5rem' }}
          onClick={() => {
            addToCart(product);
            navigate('/cart');
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* Reviews */}
      <div className="reviews-section" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)' }}>
        <h2 className="heading-secondary">Reviews</h2>
        <div className="review-list">
          {product.reviews.map((review) => (
            <div key={review.id} className="review-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <p style={{ fontWeight: 600 }}>{review.user}</p>
              <p style={{ color: '#F59E0B' }}>{'⭐'.repeat(review.rating)}</p>
              <p className="text-muted">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
