import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createCatController, getAllCatController, updateCatController, deleteCatController} from '../controllers/category.controller.js';

const router = express.Router();
// routes
// create category
router.post('/create',authMiddleware,createCatController);

// get all cat
router.get('/getAll',authMiddleware,getAllCatController);

// update cat 
router.put('/update/:id',authMiddleware,updateCatController);

// delete cat 
router.delete('/delete/:id',authMiddleware,deleteCatController);

export default router;