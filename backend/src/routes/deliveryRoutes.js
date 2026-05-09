// backend/src/routes/deliveryRoutes.js
import express from 'express';
import {
  assignAgent,
  updateDeliveryStatus,
  getDeliveryDetails,
} from '../controllers/deliveryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/assign', protect, assignAgent);
router.put('/:id/status', protect, updateDeliveryStatus);
router.get('/:id', protect, getDeliveryDetails);

export default router;
