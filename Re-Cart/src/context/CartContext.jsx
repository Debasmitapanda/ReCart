import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await apiClient.get('/api/cart');
        const formattedCart = data.items ? data.items.map(item => ({
          ...item.product,
          qty: item.quantity
        })) : [];
        setCartItems(formattedCart);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    
    // Only fetch if logged in (token exists)
    if (localStorage.getItem('token')) {
      fetchCart();
    }
  }, []);

  const addToCart = async (product) => {
    try {
      const productId = product.id || product._id;
      await apiClient.post('/api/cart', { productId, quantity: 1 });
      
      setCartItems(prev => {
        const existing = prev.find(item => (item.id || item._id)?.toString() === productId?.toString());
        if (existing) {
          return prev.map(item => 
            (item.id || item._id)?.toString() === productId?.toString() ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    // Note: The backend cartController doesn't have an explicit update route, 
    // it relies on addToCart to increment. To update exact qty, we simulate it 
    // locally for now to keep the UI smooth.
    setCartItems(prev => prev.map(item => (item.id || item._id)?.toString() === id?.toString() ? { ...item, qty } : item));
  };

  const removeItem = async (id) => {
    try {
      await apiClient.delete('/api/cart', { data: { productId: id } });
      setCartItems(prev => prev.filter(item => (item.id || item._id)?.toString() !== id?.toString()));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await apiClient.delete('/api/cart/clear');
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
