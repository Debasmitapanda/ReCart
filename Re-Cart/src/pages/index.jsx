import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { products } = useProducts();
  const { user } = useAuth();
  const sampleProducts = products.slice(0, 3);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="hero-section animate-fade-in animate-float" style={{ boxShadow: '0 10px 40px rgba(79, 70, 229, 0.15)', border: '1px solid rgba(79, 70, 229, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="heading-primary animate-gradient" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(45deg, var(--primary), #8B5CF6, #34D399, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome to Re-Cart</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '0' }}>Discover premium second-hand goods.</p>
        </div>
        <div className="product-grid">
          {sampleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
