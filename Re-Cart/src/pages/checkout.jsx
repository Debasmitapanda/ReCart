// pages/checkout.js
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'card',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      cartItems.forEach((item, index) => {
        const newOrder = {
          id: `ORD${Date.now().toString().slice(-5)}${index}`,
          product: `${item.qty}x ${item.name}`,
          status: 'Seller Confirmed',
          date: new Date().toISOString().split('T')[0],
          amount: item.price * item.qty,
          customer: form.name,
          address: form.address,
          contact: form.email
        };
        addOrder(newOrder);
      });

      console.log('Order placed locally:', { ...form, items: cartItems });
      clearCart();
      alert('Order placed successfully! Redirecting to your orders...');
      navigate('/orders');
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order.');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-content">
        <h1 className="heading-primary" style={{ textAlign: 'center' }}>Checkout</h1>
        <form
          onSubmit={handleSubmit}
          className="auth-container"
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Delivery Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            >
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
