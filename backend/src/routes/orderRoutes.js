// backend/src/routes/orderRoutes.js
import express from 'express';
import {
  placeOrder,
  getBuyerOrders,
  getSellerOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/buyer', protect, getBuyerOrders);
router.get('/seller', protect, getSellerOrders);
router.put('/:id/status', protect, updateOrderStatus);

export default router;
