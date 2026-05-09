import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductsContext';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();
  const { products } = useProducts();

  // Filter out any ghost items that were deleted from the catalog
  const validWishlistItems = wishlistItems.filter(item => 
    products.some(p => p.id === item.id)
  );

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-content">
        <h1 className="heading-primary">My Wishlist</h1>
        
        {validWishlistItems.length === 0 ? (
          <p className="text-muted">Your wishlist is empty. Start browsing products to add them here!</p>
        ) : (
          <div className="product-grid">
            {validWishlistItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
