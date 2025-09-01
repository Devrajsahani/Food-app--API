import userModel from "../models/user.model.js";

const registerController = async(req,res)=>{
    try{
        const {username, email, password, phone, address}=req.body
        if (!username || !email || !password || !address || !phone){
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
            })
        }
        const user = await userModel.create({username,email,password,address,phone})
        res.status(201).send({
            success:true,
            message:'Successfully Registered',
            user,
        })

    }catch(error){
        console.log(error)
        res.send(500).send({
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
        const user = await userModel.findOne({email:email,password:password})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found',
            })
        }
        res.status(200).send({
            success:true,
            message:'Login successfull',
            user,
        })

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