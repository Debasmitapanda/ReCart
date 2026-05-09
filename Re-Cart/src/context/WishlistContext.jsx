import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlistItems');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => {
          if (item.images) {
            item.images = item.images.map(img => img && img.startsWith('blob:') ? 'https://via.placeholder.com/300?text=Image+Expired' : img);
          }
          if (item.image && typeof item.image === 'string' && item.image.startsWith('blob:')) {
            item.image = 'https://via.placeholder.com/300?text=Image+Expired';
          }
          return item;
        });
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, removeFromWishlist, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
