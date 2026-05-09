// backend/src/routes/adminRoutes.js
import express from 'express';
import { getAllUsers, deleteUser, getAllProducts, removeProduct } from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);

router.get('/products', protect, adminOnly, getAllProducts);
router.delete('/products/:id', protect, adminOnly, removeProduct);

export default router;
