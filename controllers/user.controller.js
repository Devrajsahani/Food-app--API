//Get user info 
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
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

// reset passwoprd
const resetPasswordController = async(req,res)=>{
    try{
    const {email,newPassword,answer}=req.body;
    if(!email||!newPassword||!answer){
        return res.status(500).send({
            success:false,
            message:'Please enter  all fields',
        })
    };
    const user = await userModel.findOne({email,answer})
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User not found or invalide answer"
        })
    };
      //hashing password 
            var salt = await bcrypt.genSalt(10); // here 10 means the level of the hashing like if the number is higher then more time it will take to hash.
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            user.password = hashedPassword
                await user.save();
                res.status(200).send({
                    success:true,
                    message:"Password Reset successfully"
                });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in PASSWORD RESET API',
            error,
        })

    }
};

// UPDATE USER PASSWORD 
const updatePasswordController = async(req,res)=>{
    try{
        const user = await userModel.findById({_id:req.user.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found',

            })
        }
        // get data from user
        const {oldPassword,newPassword}= req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:'please provide old or new password',
            })
        }
        
                const ismatch = await bcrypt.compare(oldPassword, user.password);
                if(!ismatch){
                    return res.status(500).send({
                        success:false,
                        message:'Invalid old password'
                    });
                }
                //hashing password 
            var salt = await bcrypt.genSalt(10); // here 10 means the level of the hashing like if the number is higher then more time it will take to hash.
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            user.password = hashedPassword;
            await user.save()
            res.status(400).send({
                success:true,
                message:'Password updated successful'
            })

    }catch(error){
         console.log(error)
         res.status(500).send({
            success:false,
            message:'Error in Password update API',
            error
         })
    }
};
export { getUserController, updateUserController , resetPasswordController, updatePasswordController};