import Navbar from '../../../components/Navbar';
import DashboardSidebar from '../../../components/DashboardSidebar';
import { useProducts } from '../../../context/ProductsContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';

export default function MyProducts() {
  const { products, deleteProduct } = useProducts();
  const { removeFromWishlist } = useWishlist();
  const { removeItem: removeFromCart } = useCart();
  const sellerProducts = products; 

  return (
    <div className="page-wrapper">
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <DashboardSidebar role="seller" />
        
        <main className="main-content" style={{ flex: 1, padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className="heading-primary" style={{ margin: 0 }}>My Products</h1>
            <a href="/products/add" className="btn btn-primary">
              + Add New Product
            </a>
          </div>
          
          <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-light)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Product</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Category</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Price</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Condition</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      You haven't listed any products yet.
                    </td>
                  </tr>
                ) : (
                  sellerProducts.map((product, index) => (
                    <tr key={product.id} style={{ borderBottom: index !== sellerProducts.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                      <td style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img 
                          src={(product.images && product.images.length > 0) ? product.images[0] : (product.image || 'https://via.placeholder.com/150?text=No+Image')} 
                          alt={product.name} 
                          style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                        />
                        <span style={{ fontWeight: 600 }}>{product.name}</span>
                      </td>
                      <td style={{ padding: '1.5rem' }}>{product.category || 'Electronics'}</td>
                      <td style={{ padding: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>₹{product.price.toLocaleString()}</td>
                      <td style={{ padding: '1.5rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          color: 'var(--secondary)'
                        }}>
                          {product.condition || 'Excellent'}
                        </span>
                      </td>
                      <td style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn" 
                            style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                            onClick={() => window.location.href = `/products/edit/${product.id}`}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '0.5rem 1rem' }}
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this product?')) {
                                deleteProduct(product.id);
                                removeFromWishlist(product.id);
                                removeFromCart(product.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
