import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createFoodController, 
    deletefoodController, 
    getAllfoodController, 
    getFoodByRestaurantController, 
    getSingleFoodController, 
    orderStatusController, 
    placeOrderController, 
    updateFoodController
    
} from '../controllers/food.controller.js';
import { Admin } from 'mongodb';
import adminMiddleware from '../middleware/admin.middleware.js';

const router = express.Router();
// routes
// creating food router
router.post('/create',authMiddleware,createFoodController);

//get all food
router.get('/getAll',getAllfoodController);

// get single food
router.get('/get/:id',authMiddleware,getSingleFoodController);

//get food by rest
router.get("/getByRestaurant/:id",getFoodByRestaurantController);

// update food 
router.put('/update/:id',authMiddleware,updateFoodController);

//detele food 
router.delete('/delete/:id',authMiddleware,deletefoodController);

//place order
router.post('/placeorder',authMiddleware,placeOrderController);

// order status
router.post('/orderstatus/:id',adminMiddleware,authMiddleware,orderStatusController);


export default router;