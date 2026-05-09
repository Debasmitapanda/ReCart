import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/axios';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await apiClient.get('/api/wishlist');
        const formatted = data.products ? data.products : [];
        setWishlistItems(formatted);
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      }
    };
    
    if (localStorage.getItem('token')) {
      fetchWishlist();
    }
  }, []);

  const toggleWishlist = async (product) => {
    const productId = product.id || product._id;
    try {
      const exists = wishlistItems.some(item => (item.id || item._id)?.toString() === productId?.toString());
      if (exists) {
        await apiClient.delete('/api/wishlist', { data: { productId } });
        setWishlistItems(prev => prev.filter(item => (item.id || item._id)?.toString() !== productId?.toString()));
      } else {
        await apiClient.post('/api/wishlist', { productId });
        setWishlistItems(prev => [...prev, product]);
      }
    } catch (error) {
      console.error('Failed to toggle wishlist', error);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const removeFromWishlist = async (productId) => {
    try {
      await apiClient.delete('/api/wishlist', { data: { productId } });
      setWishlistItems(prev => prev.filter(item => (item.id || item._id)?.toString() !== productId?.toString()));
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item.id || item._id)?.toString() === productId?.toString());
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, removeFromWishlist, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
