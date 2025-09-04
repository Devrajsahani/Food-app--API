import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createRestaurantController } from '../controllers/restaurent.controller.js';
const router = express.Router();
// routes
// Create restaurent || Post
router.post('/create',authMiddleware,createRestaurantController);




export default router;