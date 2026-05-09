// backend/src/models/Delivery.js
import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['Assigned', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'],
      default: 'Assigned',
    },
    locationUpdates: [
      {
        timestamp: { type: Date, default: Date.now },
        location: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;
