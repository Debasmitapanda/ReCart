// backend/src/controllers/adminController.js
import User from '../models/User.js';
import Product from '../models/Product.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const removeProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product removed' });
};
