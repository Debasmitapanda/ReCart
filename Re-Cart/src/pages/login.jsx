// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      login(data, data.token);
      navigate(`/dashboard/${data.role}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <h1 className="heading-primary" style={{ textAlign: 'center' }}>Login</h1>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleLogin}
        className="btn btn-primary"
        style={{ width: '100%', marginBottom: '1rem' }}
      >
        Login
      </button>
      
      <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>
          Sign up
        </Link>
      </p>
      </div>
    </div>
  );
}
