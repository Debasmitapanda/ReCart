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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.amount * 100, // Stripe expects amount in paise/cents
      currency: 'inr',
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

    res.json({ clientSecret: paymentIntent.client_secret, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm payment (webhook or manual)
export const confirmPayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = status;
    await payment.save();

    if (status === 'Completed') {
      const order = await Order.findById(payment.order);
      order.paymentStatus = 'Paid';
      await order.save();
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
