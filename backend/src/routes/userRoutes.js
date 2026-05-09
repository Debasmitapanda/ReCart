// backend/src/routes/userRoutes.js
import express from 'express';
import { updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/profile', protect, updateUserProfile);

export default router;
