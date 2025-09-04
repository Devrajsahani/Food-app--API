import restaurentModel from "../models/restaurent.model.js";

// create restaurant 
const createRestaurantController = async(req,res)=>{
    try{
        const { title, imageUrl, foods, time, pickup , delivery, logoUrl, isOpen, rating,ratingcount, code, coords} = req.body;
        // validation 
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'Please provide title and address',
            });
        }
        const newRestaurant = await restaurentModel({
            title, imageUrl, foods, time, pickup , delivery, logoUrl, isOpen, rating,ratingcount, code, coords
        });
         await newRestaurant.save();
         res.status(201).send({
            success:true,
            message:'Restaurant is created'
         });

    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in create restaurant api',
        error
    })

    }
};

export { createRestaurantController };