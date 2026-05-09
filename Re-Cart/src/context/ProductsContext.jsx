import { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts } from '../data/mockProducts';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products_v4');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        return parsed.map(product => {
          if (product.images) {
             product.images = product.images.map(img => 
               img && img.startsWith('blob:') ? 'https://via.placeholder.com/300?text=Image+Expired' : img
             );
          }
          if (product.image && typeof product.image === 'string' && product.image.startsWith('blob:')) {
             product.image = 'https://via.placeholder.com/300?text=Image+Expired';
          }
          return product;
        });
      } catch (e) {
        return mockProducts;
      }
    }
    // Fallback to static mock products if local storage is empty
    return mockProducts;
  });

  useEffect(() => {
    localStorage.setItem('products_v4', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(), // Generate a unique ID for the new product
    };
    setProducts((prevProducts) => [productWithId, ...prevProducts]);
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter(p => p.id !== id));
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prevProducts) => prevProducts.map(p => p.id === id || p.id.toString() === id.toString() ? { ...p, ...updatedData } : p));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
