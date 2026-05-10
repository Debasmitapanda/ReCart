// pages/payment/[orderId].js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    const fetchIntent = async () => {
      const { data } = await axios.post('/api/payments/intent', { orderId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setClientSecret(data.clientSecret);
    };
    fetchIntent();
  }, [orderId]);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: { /* attach Stripe Elements card input here */ },
      },
    });
    if (!error) {
      await axios.post('/api/payments/confirm', {
        paymentId: orderId, status: 'Completed'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/orders');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      {clientSecret ? (
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Pay Now
        </button>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}
