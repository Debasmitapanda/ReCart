import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { useSearchParams } from 'react-router-dom';

export default function Products() {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredProducts = categoryFilter 
    ? products.filter(p => (p.category || 'Electronics').toLowerCase() === categoryFilter.toLowerCase())
    : products;

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="heading-primary">{categoryFilter ? `${categoryFilter} Products` : 'All Products'}</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>
            {categoryFilter ? `Browse our collection of ${categoryFilter.toLowerCase()}.` : 'Browse our entire catalog of premium second-hand goods.'}
          </p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <p className="text-muted" style={{ fontSize: '1.2rem' }}>No products found in this category.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
