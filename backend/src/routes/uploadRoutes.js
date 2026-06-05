import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  
  // Use secure_url if available, fallback to path
  const imageUrl = req.file.secure_url || req.file.path;
  res.json({ url: imageUrl });
});

export default router;
