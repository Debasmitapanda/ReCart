import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';

function getProductTimestamp(product) {
  const dateString = product.createdAt || product.updatedAt;
  const dateValue = Date.parse(dateString);
  if (!Number.isNaN(dateValue)) return dateValue;
  if (product._id || product.id) {
    const idValue = (product._id || product.id).toString();
    if (idValue.length >= 8) {
      return parseInt(idValue.slice(0, 8), 16) * 1000;
    }
  }
  return 0;
}

export default function Home() {
  const { products } = useProducts();
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMedia = ({ matches }) => {
      setIsMobile(matches);
      setPageSize(matches ? 6 : 9);
      setCurrentPage(1);
    };

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    updateMedia(mediaQuery);
    mediaQuery.addEventListener('change', updateMedia);

    return () => {
      mediaQuery.removeEventListener('change', updateMedia);
    };
  }, []);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => getProductTimestamp(b) - getProductTimestamp(a));
  }, [products]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const visibleProducts = sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const showPrev = currentPage > 1;
  const showNext = currentPage < pageCount;

  const goPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), pageCount));
  };

  const getPageButtons = () => {
    if (!isMobile || pageCount <= 2) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    return [1, 2];
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="hero-section animate-fade-in animate-float" style={{ boxShadow: '0 10px 40px rgba(79, 70, 229, 0.15)', border: '1px solid rgba(79, 70, 229, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* <h1 className="heading-primary hero-title animate-gradient" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(45deg, var(--primary), #8B5CF6, #34D399, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome to Re-Cart</h1> */}

<h1
  className="heading-primary hero-title animate-gradient"
  style={{
    fontSize: '3rem',
    fontWeight: 900,
    marginBottom: '1rem',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }}
>
  Welcome to Re-Cart
</h1>


          <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '0' }}>Discover premium second-hand goods.</p>
        </div>
        <div className="product-grid">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id || p._id} product={p} />
          ))}
        </div>

        {sortedProducts.length > pageSize && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', flexWrap: 'nowrap', overflowX: 'auto', marginTop: '2rem' }}>
            <button
              onClick={() => goPage(currentPage - 1)}
              className="btn"
              disabled={!showPrev}
              style={{ padding: '0.85rem 1.25rem', minWidth: '90px', opacity: showPrev ? 1 : 0.5, whiteSpace: 'nowrap' }}
            >
              Prev
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', alignItems: 'center', overflowX: 'auto' }}>
              {getPageButtons().map((page) => (
                <button
                  key={page}
                  onClick={() => goPage(page)}
                  className={`btn ${currentPage === page ? 'btn-primary' : ''}`}
                  style={{ padding: '0.75rem 1rem', minWidth: '40px', whiteSpace: 'nowrap' }}
                >
                  {page}
                </button>
              ))}
              {isMobile && pageCount > 2 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', minWidth: '24px', justifyContent: 'center' }}>...</span>
              )}
            </div>

            <button
              onClick={() => goPage(currentPage + 1)}
              className="btn"
              disabled={!showNext}
              style={{ padding: '0.85rem 1.25rem', minWidth: '90px', opacity: showNext ? 1 : 0.5 }}
            >
              Next
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
