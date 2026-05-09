// backend/src/routes/cartRoutes.js
import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Assuming protect exists in authMiddleware

const router = express.Router();

// All cart routes require the user to be logged in
router.use(protect);

router.delete('/clear', clearCart);

router.route('/')
  .get(getCart)
  .post(addToCart)
  .delete(removeFromCart);

export default router;
