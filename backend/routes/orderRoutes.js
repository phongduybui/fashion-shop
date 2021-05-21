import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
} from '../controllers/orderControllers.js';
import protect from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
