// backend/src/controllers/paymentController.js
import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import { stripe } from '../config/stripe.js';

// Create Stripe payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.paymentStatus === 'Paid') {
      return res.status(400).json({ message: 'Order is already paid' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.amount * 100),
      currency: 'inr',
      payment_method_types: ['card'],
      metadata: { orderId: order._id.toString() },
    });

    const payment = await Payment.create({
      order: order._id,
      buyer: req.user._id,
      amount: order.amount,
      currency: 'INR',
      provider: 'Stripe',
      transactionId: paymentIntent.id,
    });

    res.json({ clientSecret: paymentIntent.client_secret, payment, amount: order.amount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm payment by verifying Stripe payment intent status
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) {
      return res.status(400).json({ message: 'Payment intent ID is required' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) return res.status(404).json({ message: 'Payment intent not found' });

    const payment = await Payment.findOne({ transactionId: paymentIntent.id });
    if (!payment) return res.status(404).json({ message: 'Payment record not found' });

    payment.status = paymentIntent.status === 'succeeded' ? 'Completed' : 'Failed';
    await payment.save();

    if (payment.status === 'Completed') {
      const order = await Order.findById(payment.order);
      if (order) {
        order.paymentStatus = 'Paid';
        await order.save();
      }
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
