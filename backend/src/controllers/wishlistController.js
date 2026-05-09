// backend/src/controllers/wishlistController.js
import Wishlist from '../models/Wishlist.js';

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ buyer: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ buyer: req.user._id, products: [] });

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
    await wishlist.save();
  }
  res.json(wishlist);
};

export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ buyer: req.user._id }).populate('products');
  res.json(wishlist || { products: [] });
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  const wishlist = await Wishlist.findOne({ buyer: req.user._id });
  if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

  wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
  await wishlist.save();
  res.json(wishlist);
};
