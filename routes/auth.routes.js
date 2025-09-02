import express from 'express';
import { registerController ,loginController } from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js';
import { updateUserController } from '../controllers/user.controller.js';
const router = express.Router();

// routes
//REGISTER || POST 
router.post('/register',registerController);

//LOGIN || POST 
router.post('/login', loginController);


export default router;