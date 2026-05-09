// backend/src/controllers/orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Place new order
export const placeOrder = async (req, res) => {
  try {
    const { productId, deliveryAddress, amount, deliveryCharge } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const order = await Order.create({
      buyer: req.user._id,
      seller: product.seller,
      product: product._id,
      deliveryAddress,
      amount,
      deliveryCharge,
    });

    res.status(201).json(order);
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
