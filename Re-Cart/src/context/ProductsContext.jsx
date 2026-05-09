import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/axios';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await apiClient.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = async (id) => {
    try {
      await apiClient.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const { data } = await apiClient.put(`/api/products/${id}`, updatedData);
      setProducts((prev) => prev.map(p => p._id === id ? data : p));
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
