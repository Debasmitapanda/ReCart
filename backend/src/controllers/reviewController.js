// backend/src/controllers/reviewController.js
import Review from '../models/Review.js';
import Product from '../models/Product.js';

// Add review
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = await Review.create({
      product: product._id,
      buyer: req.user._id,
      seller: product.seller,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('buyer', 'name email')
      .populate('seller', 'name email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a seller
export const getSellerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ seller: req.params.sellerId })
      .populate('buyer', 'name email')
      .populate('product', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
