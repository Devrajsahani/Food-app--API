import express from 'express';
import { getUserController, resetPasswordController, updatePasswordController, updateUserController } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();

//get user data
router.get('/getUser',authMiddleware,getUserController);

router.put('/updateUser',authMiddleware,updateUserController);

// reset password
router.post('/resetPassword',authMiddleware,resetPasswordController);

// update password 
router.post('/updatePassword',authMiddleware,updatePasswordController);






export default router;