import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
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
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const productId = product.id || product._id;
      const existing = prev.find(item => (item.id || item._id)?.toString() === productId?.toString());
      if (existing) {
        return prev.map(item => 
          (item.id || item._id)?.toString() === productId?.toString() ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(item => (item.id || item._id)?.toString() === id?.toString() ? { ...item, qty } : item));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => (item.id || item._id)?.toString() !== id?.toString()));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
