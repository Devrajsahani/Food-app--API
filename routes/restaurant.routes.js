import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createRestaurantController,
     deleteRestaurantController, 
     getAllRestaurantController, 
     getRestaurantByIdController,

    } from '../controllers/restaurant.controller.js';
const router = express.Router();
// routes
// Create restaurent || Post
router.post('/create',authMiddleware,createRestaurantController);

// get all restaurant details
router.get('/getAll',authMiddleware,getAllRestaurantController);

// get restaurant by id || get

router.get('/get/:id',authMiddleware,getRestaurantByIdController);

// delete restaurant 
router.delete('/delete/:id',authMiddleware,deleteRestaurantController);


export default router;