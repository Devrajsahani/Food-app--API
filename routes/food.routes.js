import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createFoodController } from '../controllers/food.controller.js';

const router = express.Router();
// routes
// creating food router
router.post('/create',authMiddleware,createFoodController);
export default router;