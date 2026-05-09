// pages/signup.js
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Signup() {
  const { login } = useAuth();
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { data } = await axios.post('/api/auth/register', form);
      
      // Wipe the local memory clean so the new user starts fresh
      clearCart();
      clearWishlist();

      login(data, data.token);
      navigate(`/dashboard/${data.role}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <h1 className="heading-primary" style={{ textAlign: 'center' }}>Signup</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Account Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="agent">Agent</option>
      </select>
      </div>
      <button
        onClick={handleSignup}
        className="btn btn-primary"
        style={{ width: '100%', marginBottom: '1rem' }}
      >
        Sign Up
      </button>
      
      <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
      </div>
    </div>
  );
}
