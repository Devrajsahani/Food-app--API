//Get user info 
import userModel from '../models/user.model.js';
const getUserController =async(req,res) =>{
    try{
        //find user
        const user = await userModel.findById(req.user.id) // here instead of passing everyhting in body we are passing it in user.function 
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        // hide password 
        user.password = undefined;

        //res end
        res.status(200).send({
        success:true,
        message:"User get successfully",
        user,

        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get user API',
            error
        })
    }
};


// update user
const updateUserController = async(req,res)=>{
    try{
        const user = await userModel.findById({_id:req.user.id})
        //validation 
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found',
            })
        }
        //update
        const {username, address,phone}=req.body;
        if(username)user.username = username;
        if(address)user.address = address;
        if(phone)user.phone = phone;
        // save user
        await user.save();
        res.status(200).send({
            success:true,
            message:'User updated successfully',
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in updating the user API',
            error,
        })
    }
};
export { getUserController, updateUserController };