import foodModel from "../models/food.model.js";

// create food 
const createFoodController = async(req,res)=>{
    try{
        const {title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isFoodAvailabel,
            restaurant,
            ratingCount,
            rating} = req.body;
            if(!title || !description|| !price || !restaurant){
                return res.status(500).send({
                    success:false,
                    message:'Please provide all fields',
                })
            }
            const newFood = new foodModel({
                title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isFoodAvailabel,
            restaurant,
            ratingCount,
            rating
            });
            await newFood.save();
            res.status(201).send({
                success:true,
                message:"New food item created",
                newFood
            })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in create food api',
            error
        })
    }
};


export { createFoodController };