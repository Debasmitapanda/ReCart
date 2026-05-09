// backend/src/models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: [
        'Order Placed',
        'Seller Confirmed',
        'Delivery Agent Assigned',
        'Picked Up',
        'Shipped',
        'Out for Delivery',
        'Delivered',
      ],
      default: 'Order Placed',
    },
    deliveryAddress: { type: String, required: true },
    amount: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
