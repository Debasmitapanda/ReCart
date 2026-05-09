// backend/src/controllers/orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';

import User from '../models/User.js';

// Place new order
export const placeOrder = async (req, res) => {
  try {
    const { productId, deliveryAddress, amount, deliveryCharge } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const agents = await User.find({ role: 'agent' });
    const assignedAgent = agents.length > 0 ? agents[Math.floor(Math.random() * agents.length)]._id : null;

    const order = await Order.create({
      buyer: req.user._id,
      seller: product.seller,
      product: product._id,
      deliveryAgent: assignedAgent,
      deliveryAddress,
      amount,
      deliveryCharge,
      status: assignedAgent ? 'Delivery Agent Assigned' : 'Order Placed'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get agent orders
export const getAgentOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryAgent: req.user._id })
      .populate('product')
      .populate('buyer', 'name email')
      .populate('seller', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get buyer orders
export const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('product')
      .populate('seller', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get seller orders
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user._id })
      .populate('product')
      .populate('buyer', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (seller/agent/admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
