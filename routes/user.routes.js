import express from 'express';
import { getUserController, updateUserController } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();

//get user data
router.get('/getUser',authMiddleware,getUserController);

router.put('/updateUser',authMiddleware,updateUserController);






export default router;