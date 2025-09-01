import express from 'express';
import testUserController from '../controllers/test_controllers.js'


//router object
const router = express.Router();

// routes get/post/update/delete
router.get('/test-user',(req,res)=>{
    res.send("Welcome to test route");

})

export default router;
