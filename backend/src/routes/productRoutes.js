// backend/src/routes/productRoutes.js
import express from 'express';
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, addProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
