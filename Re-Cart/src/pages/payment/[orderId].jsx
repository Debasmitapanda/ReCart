// pages/payment/[orderId].js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret, amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet. Please wait a moment.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage('Card details are missing.');
      return;
    }

    setIsSubmitting(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed.');
      setIsSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        await axios.post('/api/payments/confirm', { paymentIntentId: paymentIntent.id });
        onSuccess();
      } catch (confirmError) {
        setErrorMessage(confirmError.response?.data?.message || 'Unable to confirm payment with the server.');
      }
    } else {
      setErrorMessage('Payment did not complete. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Card details</label>
        <div className="mt-2 p-4 border rounded-lg">
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#1f2937', '::placeholder': { color: '#9ca3af' } } } }} />
        </div>
      </div>
      <div className="mb-4 text-sm text-gray-700">
        Total amount: <strong>₹{amount}</strong>
      </div>
      {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Processing payment...' : 'Pay securely with Stripe'}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;

    const fetchIntent = async () => {
      try {
        const { data } = await axios.post('/api/payments/intent', { orderId });
        setClientSecret(data.clientSecret);
        setAmount(data.amount || 0);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to initialize payment.');
      } finally {
        setLoading(false);
      }
    };

    fetchIntent();
  }, [orderId]);

  const handleSuccess = () => {
    navigate('/orders');
  };

  return (
    <div className="page-wrapper">
      <div className="main-content max-w-xl mx-auto py-12">
        <h1 className="heading-primary text-center mb-6">Secure Payment</h1>
        {loading ? (
          <p>Loading payment details...</p>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-800 rounded">{error}</div>
        ) : !publishableKey ? (
          <div className="p-4 bg-yellow-100 text-yellow-900 rounded">
            Stripe publishable key is missing. Please add <code>VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...</code> to <code>Re-Cart/.env</code>.
          </div>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} amount={amount} onSuccess={handleSuccess} />
          </Elements>
        )}
      </div>
    </div>
  );
}
