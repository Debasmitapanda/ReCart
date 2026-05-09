// backend/src/routes/reviewRoutes.js
import express from 'express';
import { addReview, getProductReviews, getSellerReviews } from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addReview);
router.get('/product/:productId', getProductReviews);
router.get('/seller/:sellerId', getSellerReviews);

export default router;
