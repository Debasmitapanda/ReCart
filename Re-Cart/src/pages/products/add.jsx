import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useProducts } from '../../context/ProductsContext';
import apiClient from '../../api/axios';

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    condition: 'Good',
    description: '',
    image: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addProduct } = useProducts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      let uploadedImageUrl = null;
      
      // Upload image to backend/cloudinary if selected
      if (form.image) {
        const formData = new FormData();
        formData.append('image', form.image);
        
        const uploadRes = await apiClient.post('/api/upload', formData);
        uploadedImageUrl = uploadRes.data.url;
      }

      const newProduct = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        condition: form.condition,
        description: form.description,
        images: uploadedImageUrl ? [uploadedImageUrl] : [],
        age: 'Brand New',
        deliveryCharge: 0
      };

      const productRes = await apiClient.post('/api/products', newProduct);
      
      // Save globally to context
      addProduct(productRes.data);
      
      alert('Product added successfully!');
      
      // Redirect back to seller products dashboard
      navigate('/dashboard/seller/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <h1 className="heading-primary" style={{ textAlign: 'center' }}>Add New Product</h1>
        
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
            <label>Upload Product Image</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="file"
                accept="image/*"
                onChange={e => setForm({...form, image: e.target.files[0]})}
                style={{ padding: '0.5rem', border: '1px dashed var(--primary)', background: 'rgba(79, 70, 229, 0.05)', cursor: 'pointer' }}
              />
              {form.image && <span style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>Image selected</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '1rem', padding: '1rem', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'Publishing...' : 'Publish Product'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
