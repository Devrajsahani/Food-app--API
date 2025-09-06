import userModel from '../models/user.model.js'

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id)
    if(user.usertype !== "admin"){
        return res.status (401).send({
            success:false,
            message:"Only admin access"
        });
    }   else{
        next();
        }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unauthorize access",
      error,
    });
  }
};

export default adminMiddleware;
