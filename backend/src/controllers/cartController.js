// backend/src/controllers/cartController.js
import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ buyer: req.user._id });
  if (!cart) cart = await Cart.create({ buyer: req.user._id, items: [] });

  const existingItem = cart.items.find((i) => i.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  res.json(cart);
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ buyer: req.user._id }).populate('items.product');
  res.json(cart || { items: [] });
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ buyer: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};
