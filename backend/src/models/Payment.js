// backend/src/models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    provider: { type: String, enum: ['Stripe', 'Razorpay'], default: 'Stripe' },
    transactionId: { type: String },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
