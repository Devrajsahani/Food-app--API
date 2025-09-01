import express from 'express';
import { registerController ,loginController } from '../controllers/auth.controller.js'
const router = express.Router();

// routes
//REGISTER || POST 
router.post('/register',registerController);

//LOGIN || POST 
router.post('/login', loginController);

export default router;