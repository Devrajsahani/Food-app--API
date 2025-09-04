import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken';

const registerController = async(req,res)=>{
    try{
        const {username, email, password, phone, address, answer}=req.body
        if (!username || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        //check user 
        const existing = await userModel.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:'Email is already registered please login again.',
            });
        }

         //hashing password 
        var salt = await bcrypt.genSalt(10); // here 10 means the level of the hashing like if the number is higher then more time it will take to hash.
        const hashedPassword = await bcrypt.hash(password,salt);



       //create user
        const user = await userModel.create({
            username,
            email,
            password:hashedPassword,
            address,
            phone,
            answer,
        })
        res.status(201).send({
            success:true,
            message:'Successfully Registered',
            user,
        })

 
       
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Register API',
        })
    }

};


// login user
const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;

        // validation 
        if(!email||!password){
            return res.status(500).send({
                success:false,
                message:'Please provide valid email or password',
            })
        }

        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found',
            });
        }

        // check user password | compare password

        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
            return res.status(500).send({
                success:false,
                message:'Invalid credentials'
            });
        }

        // token 
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });// so here we are using the jwt to hash the token using id of the user.
        user.password =undefined;
        res.status(200).send({
            success:true,
            message:'Login successfull',
            token,
            user,
        });

    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login API',
            error
        })

    }

}
export { registerController , loginController }; // here we are exporting more than one controller file so we cannot export default here.
// jwt is used ot create a protected route between the user and the data, it will create a token and that token will be used to verify the 
// the authencity of the user.