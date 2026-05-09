import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useProducts } from '../../context/ProductsContext';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();
  
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    condition: 'Good',
    description: '',
    image: null
  });

  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const productToEdit = products.find(p => p.id.toString() === id);
    if (productToEdit) {
      setForm({
        name: productToEdit.name || '',
        category: productToEdit.category || '',
        price: productToEdit.price || '',
        condition: productToEdit.condition || 'Good',
        description: productToEdit.description || '',
        image: null
      });
      setExistingImages(productToEdit.images || []);
    }
  }, [id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = null;
      
      // Convert physical image to a permanent Base64 string for local storage
      if (form.image) {
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(form.image);
        });
      }

      const updatedProduct = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        condition: form.condition,
        description: form.description,
        images: imageUrl ? [imageUrl] : existingImages, // Replace image if new one uploaded
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Save globally
      updateProduct(id, updatedProduct);
      
      alert('Product updated successfully!');
      
      // Redirect back to seller products dashboard
      navigate('/dashboard/seller/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <h1 className="heading-primary" style={{ textAlign: 'center' }}>Edit Product</h1>
        
        <form onSubmit={handleSubmit} className="auth-container" style={{ maxWidth: '600px' }}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              placeholder="e.g. Sony PlayStation 5"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              required
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
            >
              <option value="">Select a Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              required
              min="1"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              placeholder="e.g. 45000"
            />
          </div>

          <div className="form-group">
            <label>Condition</label>
            <select
              required
              value={form.condition}
              onChange={e => setForm({...form, condition: e.target.value})}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              rows="4"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Describe the product, its age, and any flaws..."
            />
          </div>

          <div className="form-group">
            <label>Upload New Product Image (Optional)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="file"
                accept="image/*"
                onChange={e => setForm({...form, image: e.target.files[0]})}
                style={{ padding: '0.5rem', border: '1px dashed var(--primary)', background: 'rgba(79, 70, 229, 0.05)', cursor: 'pointer' }}
              />
              {form.image && <span style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>New image selected</span>}
            </div>
            {existingImages.length > 0 && !form.image && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Leave empty to keep the existing image.
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            Save Changes
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
