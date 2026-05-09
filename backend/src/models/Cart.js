// backend/src/models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
