// backend/src/routes/paymentRoutes.js
import express from 'express';
import { createPaymentIntent, confirmPayment } from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/intent', protect, createPaymentIntent);
router.post('/confirm', protect, confirmPayment);

export default router;
