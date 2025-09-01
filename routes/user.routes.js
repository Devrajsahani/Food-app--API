import express from 'express';
import { getUserController } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const userRoutes = express.Router();

//get user data
userRoutes.get('/getuser',authMiddleware,getUserController)

export default userRoutes;